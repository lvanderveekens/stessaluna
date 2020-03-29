<?php

namespace Stessaluna\Api\Post\Dto;

use DateTimeInterface;
use Stessaluna\Api\Post\Comment\Dto\CommentDto;
use Stessaluna\Api\User\Dto\UserDto;

abstract class PostDto
{
    public int $id;

    private string $type;

    public DateTimeInterface $createdAt;

    public UserDto $author;

    /** @var CommentDto[] */
    public array $comments;

    public function __construct(string $type)
    {
        $this->type = $type;
    }

    public function getType(): string {
        return $this->type;
    }
}