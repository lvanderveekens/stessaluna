<?php

namespace Stessaluna\Api\Post\Comment\Dto;

use Stessaluna\Api\User\Dto\UserConverter;
use Psr\Log\LoggerInterface;
use Stessaluna\Domain\Post\Comment\Entity\Comment;

// TODO: Gebruik Post als Aggregate Root
class CommentConverter
{
    private $logger;

    private $userConverter;

    public function __construct(LoggerInterface $logger, UserConverter $userConverter)
    {
        $this->logger = $logger;
        $this->userConverter = $userConverter;
    }

    public function toDto(Comment $comment) 
    {
        $dto = new CommentDto();
        $dto->setId($comment->getId());
        $dto->setCreatedAt($comment->getCreatedAt());
        $dto->setText($comment->getText());
        // TODO: move convertToDto to a common place
        $dto->setUser($this->userConverter->toDto($comment->getUser()));
        return $dto;
    }
}
