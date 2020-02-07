<?php

namespace App\Service;

use App\Dto\CommentDto;
use App\Entity\Comment;
use Psr\Log\LoggerInterface;

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
