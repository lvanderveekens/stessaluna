<?php

namespace Stessaluna\Api\Post\Dto;

use Stessaluna\Dto\Post\Comment\CommentDto;
use Stessaluna\Dto\UserDto;
use DateTimeInterface;

abstract class PostDto
{
    protected $id;

    protected $type;

    protected $createdAt;

    protected $user;

    protected $avatar;

    protected $comments;

    public function __construct(string $type)
    {
        $this->type = $type;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setCreatedAt(DateTimeInterface $createdAt) 
    {
        $this->createdAt = $createdAt;
    }

    public function getCreatedAt(): DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setUser(UserDto $user)
    {
        $this->user = $user;
    }

    public function getUser(): UserDto
    {
        return $this->user;
    }

    public function setAvatar(string $avatar)
    {
        $this->avatar = $avatar;
    }
    
    public function getAvatar(): string {
        return $this->avatar;
    }

    /**
     * @param CommentDto[] comments
     */
    public function setComments(array $comments)
    {
        $this->comments = $comments;
    }

    /**
     * @return CommentDto[]
     */
    public function getComments(): array
    {
        return $this->comments;
    }
}