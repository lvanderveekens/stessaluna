<?php

namespace Stessaluna\Comment\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Comment\Entity\Comment;
use Stessaluna\User\Dto\UserToUserDtoConverter;

class CommentToCommentDtoConverter
{
    /** @var LoggerInterface */
    private $logger;

    /** @var UserToUserDtoConverter */
    private $userToDtoConverter;

    public function __construct(LoggerInterface $logger, UserToUserDtoConverter $userToDtoConverter)
    {
        $this->logger = $logger;
        $this->userToDtoConverter = $userToDtoConverter;
    }

    public function convert(Comment $comment): CommentDto
    {
        $dto = new CommentDto();
        $dto->setId($comment->getId());
        $dto->setCreatedAt($comment->getCreatedAt());
        $dto->setText($comment->getText());
        $dto->setUser($this->userToDtoConverter->convert($comment->getUser()));
        return $dto;
    }
}
