<?php

namespace Stessaluna\Post\Comment\Dto;

use Stessaluna\User\Dto\UserDto;

class CommentDto
{
    private $id;

    private $text;

    private $createdAt;

    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUser(): ?UserDto
    {
        return $this->user;
    }

    public function setUser(UserDto $user): self
    {
        $this->user = $user;
        return $this;
    }
}