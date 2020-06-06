<?php

namespace Stessaluna\Post\Comment\Controller;

use DateTime;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Stessaluna\Post\Comment\Dto\CommentDtoConverter;
use Stessaluna\Post\Comment\Entity\Comment;
use Stessaluna\Post\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/posts/{postId}/comments")
 *
 * @IsGranted("IS_AUTHENTICATED_ANONYMOUSLY")
 */
class CommentController extends AbstractController
{
    private CommentDtoConverter $commentConverter;
    private LoggerInterface $logger;

    public function __construct(CommentDtoConverter $commentConverter, LoggerInterface $logger)
    {
        $this->commentConverter = $commentConverter;
        $this->logger = $logger;
    }

    /**
     * @Route(methods={"GET"})
     */
    public function getComments(int $postId): JsonResponse
    {
        $comments = $this->getDoctrine()
            ->getRepository(Comment::class)
            ->findBy(array('post' => $postId));

        return $this->json(array_map(function (Comment $comment) {
            return $this->commentConverter->toDto($comment);
        }, $comments));
    }

    /**
     * @Route(methods={"POST"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function addComment(int $postId, Request $request): JsonResponse
    {
        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();
        $post = $em->getRepository(Post::class)->find($postId);

        $comment = new Comment();
        $comment->setPost($post);
        $comment->setUser($user);
        $comment->setCreatedAt(new DateTime('now'));
        $comment->setText($request->get('text'));

        $em->persist($comment);
        $em->flush();

        return $this->json($this->commentConverter->toDto($comment));
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function deleteCommentById(int $id)
    {
        $em = $this->getDoctrine()->getManager();
        $comment = $em->getRepository(Comment::class)->find($id);

        if ($this->getUser()->getId() != $comment->getUser()->getId()) {
            throw new AccessDeniedHttpException("Only the owner can delete this comment");
        }

        $em->remove($comment);
        $em->flush();
        return new Response('Deleted comment with id ' . $id);
    }
}
