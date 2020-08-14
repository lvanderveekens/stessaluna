<?php
declare(strict_types=1);

namespace Stessaluna\Comment;


use DateTime;
use Stessaluna\Comment\Entity\Comment;
use Stessaluna\Comment\Repository\CommentRepository;
use Stessaluna\Exception\NotAuthorException;
use Stessaluna\Exception\ResourceNotFoundException;
use Stessaluna\Post\PostService;
use Stessaluna\User\Entity\User;

class CommentService
{
    /**
     * @var CommentRepository
     */
    private $commentRepository;
    /**
     * @var PostService
     */
    private $postService;

    public function __construct(CommentRepository $commentRepository, PostService $postService)
    {
        $this->commentRepository = $commentRepository;
        $this->postService = $postService;
    }


    public function getComment(int $id): Comment
    {
        $comment = $this->commentRepository->find($id);
        if (!$comment) {
            throw new ResourceNotFoundException('Comment not found for id: ' . $id);
        }
        return $comment;
    }

    public function addComment(int $postId, string $text, User $user): Comment
    {
        $post = $this->postService->findPost($postId);
        if (!$post) {
            throw new ResourceNotFoundException('Post not found for id: ' . $postId);
        }

        $comment = new Comment();
        $comment->setPost($post);
        $comment->setCreatedAt(new DateTime('now'));
        $comment->setText($text);
        $comment->setUser($user);
        return $this->commentRepository->save($comment);
    }

    public function deleteComment(int $id, User $user)
    {
        $comment = $this->commentRepository->find($id);
        if (!$comment) {
            return;
        }
        if ($comment->getUser()->getId() != $user->getId()) {
            throw new NotAuthorException('Not author of comment: ' . $id);
        }
        $this->commentRepository->delete($comment);
    }
}