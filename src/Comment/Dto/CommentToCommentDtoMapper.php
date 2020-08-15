<?php

namespace Stessaluna\Comment\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Comment\Entity\Comment;
use Stessaluna\User\Dto\UserToUserDtoMapper;
use Stessaluna\Vote\Dto\VoteToVoteDtoMapper;
use Stessaluna\Vote\Entity\Vote;

class CommentToCommentDtoMapper
{
    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var UserToUserDtoMapper
     */
    private $userToUserDtoMapper;

    /**
     * @var VoteToVoteDtoMapper
     */
    private $voteToVoteDtoMapper;

    public function __construct(LoggerInterface $logger, UserToUserDtoMapper $userToUserDtoMapper,
                                VoteToVoteDtoMapper $voteToVoteDtoMapper)
    {
        $this->logger = $logger;
        $this->userToUserDtoMapper = $userToUserDtoMapper;
        $this->voteToVoteDtoMapper = $voteToVoteDtoMapper;
    }

    public function map(Comment $comment): CommentDto
    {
        $dto = new CommentDto();
        $dto->id = $comment->getId();
        $dto->createdAt = $comment->getCreatedAt();
        $dto->text = $comment->getText();
        $dto->user = $this->userToUserDtoMapper->map($comment->getUser());
        $dto->votes = array_map(function (Vote $vote) {
            return $this->voteToVoteDtoMapper->map($vote);
        }, $comment->getVotes()->toArray());
        return $dto;
    }
}
