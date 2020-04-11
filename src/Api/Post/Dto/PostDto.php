<?php

namespace Stessaluna\Api\Post\Dto;

use DateTimeInterface;
use Stessaluna\Api\Exercise\Dto\ExerciseDto;
use Stessaluna\Api\Post\Comment\Dto\CommentDto;
use Stessaluna\Api\User\Dto\UserDto;

class PostDto
{
    public int $id;

    public DateTimeInterface $createdAt;

    public UserDto $author;

    public ?string $text = null;

    public ?string $image = null;

    public ?ExerciseDto $exercise = null;

    /** @var CommentDto[] */
    public array $comments;
}