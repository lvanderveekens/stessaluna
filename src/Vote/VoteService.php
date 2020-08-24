<?php

declare(strict_types=1);

namespace Stessaluna\Vote;

use Stessaluna\Comment\CommentService;
use Stessaluna\Comment\Entity\Comment;
use Stessaluna\Exception\ResourceAlreadyExistsException;
use Stessaluna\Exception\ResourceNotFoundException;
use Stessaluna\Post\Entity\Post;
use Stessaluna\Post\PostService;
use Stessaluna\User\Entity\User;
use Stessaluna\Vote\Entity\Vote;
use Stessaluna\Vote\Repository\VoteRepository;

class VoteService
{

    /**
     * @var VoteRepository
     */
    private $voteRepository;
    /**
     * @var PostService
     */
    private $postService;
    /**
     * @var CommentService
     */
    private $commentService;

    public function __construct(VoteRepository $voteRepository, PostService $postService,
                                CommentService $commentService)
    {
        $this->voteRepository = $voteRepository;
        $this->postService = $postService;
        $this->commentService = $commentService;
    }

    public function getVote(int $id): Vote
    {
        $vote = $this->voteRepository->find($id);
        if (!$vote) {
            throw new ResourceNotFoundException('Vote not found for id: ' . $id);
        }
        return $vote;
    }

    public function addVote(string $type, ?int $postId, ?int $commentId, User $user): Vote
    {
        $vote = new Vote();
        $vote->setType($type);
        $vote->setUser($user);

        if ($postId != null) {
            $vote->setPost($this->getPostToVoteOn($postId, $user));
        } else if ($commentId != null) {
            $vote->setComment($this->getCommentToVoteOn($commentId, $user));
        }

        return $this->voteRepository->save($vote);
    }

    public function updateVote(int $id, ?string $type): Vote
    {
        $vote = $this->getVote($id);
        if ($type) {
            $vote->setType($type);
        }
        return $this->voteRepository->save($vote);
    }

    public function deleteVote(int $id)
    {
        $vote = $this->getVote($id);
        $this->voteRepository->delete($vote);
    }

    private function getPostToVoteOn(int $postId, User $user): Post
    {
        $post = $this->postService->getPost($postId);
        $existingVote = $this->voteRepository->findOneBy(['post' => $post, 'user' => $user]);
        if ($existingVote) {
            throw new ResourceAlreadyExistsException("You already voted on post: $postId");
        }
        return $post;
    }

    private function getCommentToVoteOn(int $commentId, User $user): Comment
    {
        $comment = $this->commentService->getComment($commentId);
        $existingVote = $this->voteRepository->findOneBy(['comment' => $comment, 'user' => $user]);
        if ($existingVote) {
            throw new ResourceAlreadyExistsException("You already voted on comment: $commentId");
        }
        return $comment;
    }
}