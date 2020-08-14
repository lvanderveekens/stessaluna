<?php

declare(strict_types=1);

namespace Stessaluna\Vote;

use Stessaluna\Comment\CommentService;
use Stessaluna\Exception\ResourceNotFoundException;
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
            $vote->setPost($this->postService->getPost($postId));
        } else if ($commentId != null) {
            $vote->setComment($this->commentService->getComment($commentId));
        }

        return $this->voteRepository->save($vote);
    }

    public function deleteVote(int $voteId)
    {
        $vote = $this->getVote($voteId);
        $this->voteRepository->delete($vote);
    }
}