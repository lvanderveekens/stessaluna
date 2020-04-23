<?php

namespace Stessaluna\Post\Comment\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\User\Dto\UserDtoConverter;
use Stessaluna\Post\Comment\Entity\Comment;

class CommentDtoConverter
{
    private $logger;

    private UserDtoConverter $userDtoConverter;

    public function __construct(LoggerInterface $logger, UserDtoConverter $userDtoConverter)
    {
        $this->logger = $logger;
        $this->userDtoConverter = $userDtoConverter;
    }

    public function toDto(Comment $comment): CommentDto
    {
        $dto = new CommentDto();
        $dto->setId($comment->getId());
        $dto->setCreatedAt($comment->getCreatedAt());
        $dto->setText($comment->getText());
        // TODO: move convertToDto to a common place
        $dto->setUser($this->userDtoConverter->toDto($comment->getUser()));
        return $dto;
    }
}
