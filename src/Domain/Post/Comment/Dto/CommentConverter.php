<?php

namespace Stessaluna\Domain\Post\Comment\Dto;

use Stessaluna\Application\User\Dto\UserConverter as DtoUserConverter;
use Stessaluna\Dto\Post\Comment\CommentDto;
use Psr\Log\LoggerInterface;

// TODO: Gebruik Post als Aggregate Root
class CommentConverter
{
    private $logger;
    private $userConverter;

    public function __construct(LoggerInterface $logger, DtoUserConverter $userConverter)
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
