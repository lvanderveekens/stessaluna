<?php

namespace Stessaluna\Comment\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Comment\Entity\Comment;
use Stessaluna\User\Dto\UserToUserDtoMapper;

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

    public function __construct(LoggerInterface $logger, UserToUserDtoMapper $userToUserDtoMapper)
    {
        $this->logger = $logger;
        $this->userToUserDtoMapper = $userToUserDtoMapper;
    }

    public function map(Comment $comment): CommentDto
    {
        $dto = new CommentDto();
        $dto->id = $comment->getId();
        $dto->createdAt = $comment->getCreatedAt();
        $dto->text = $comment->getText();
        $dto->user = $this->userToUserDtoMapper->map($comment->getUser());
        return $dto;
    }
}
