<?php

namespace App\Controller;

use App\Dto\CommentDto;
use App\Entity\Comment;
use App\Entity\Post;
use App\Service\CommentConverter;
use App\Service\UserConverter;
use DateTime;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/posts/{postId}/comments")
 */
class CommentController extends AbstractController
{
    private $logger;
    private $commentConverter;

    public function __construct(LoggerInterface $logger, CommentConverter $commentConverter)
    {
        $this->logger = $logger;
        $this->commentConverter = $commentConverter;
    }

    /**
     * @Route(methods={"GET"})
     */
    public function getComments(int $postId): JsonResponse
    {
        $comments = $this->getDoctrine()
            ->getRepository(Comment::class)
            ->findBy(array('post' => $postId));

        return $this->json(array_map(function ($comment) {
            return $this->commentConverter->toDto($comment);
        }, $comments));
    }

    /**
     * @Route(methods={"POST"})
     */
    public function addComment(int $postId, Request $request): JsonResponse
    {
        // TODO: json decoding can become some sort of middleware in Symfony
        $json = json_decode($request->getContent(), true);

        $user = $this->getUser();

        $em = $this->getDoctrine()->getManager();
        $post = $em->getRepository(Post::class)->find($postId);

        $comment = new Comment();
        $comment->setPost($post);
        $comment->setUser($user);
        $comment->setCreatedAt(new DateTime('now'));
        $comment->setText($json['text']);

        $em->persist($comment);
        $em->flush();

        return $this->json($this->commentConverter->toDto($comment));
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function deleteCommentById(int $id)
    {
        $em = $this->getDoctrine()->getManager();
        $comment = $em->getRepository(Comment::class)->find($id);

        if ($this->getUser()->getId() != $comment->getUser()->getId()) {
            throw new AccessDeniedHttpException("You are not the owner of this comment");
        }

        $em->remove($comment);
        $em->flush();
        return new Response('Deleted comment with id ' . $id);
    }
}
