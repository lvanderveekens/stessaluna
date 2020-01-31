<?php

namespace App\Controller;

use App\Dto\CommentDto;
use App\Entity\Comment;
use App\Entity\Post;
use DateTime;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/posts/{postId}/comments")
 */
class CommentController extends AbstractController
{
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * @Route("/", methods={"GET"})
     */
    public function getComments(int $postId): JsonResponse
    {
        $comments = $this->getDoctrine()
            ->getRepository(Comment::class)
            ->findBy(array('post' => $postId));

        return $this->json(array_map(function ($comment) {
            return $this->convertToDto($comment);
        }, $comments));
    }

    /**
     * @Route("/", methods={"POST"})
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

        return $this->json($this->convertToDto($comment));
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function deleteCommentById(int $id)
    {
        $em = $this->getDoctrine()->getManager();
        // TODO: what if $id does not exist? return 404
        $comment = $em->getRepository(Comment::class)->find($id);
        $em->remove($comment);
        $em->flush();
        return new Response('Deleted comment with id ' . $id);
    }

    public static function convertToDto(Comment $comment): CommentDto
    {
        $dto = new CommentDto();
        $dto->setId($comment->getId());
        $dto->setCreatedAt($comment->getCreatedAt());
        $dto->setText($comment->getText());
        // TODO: move convertToDto to a common place
        $dto->setUser(UserController::convertToDto($comment->getUser()));
        return $dto;
    }
}
