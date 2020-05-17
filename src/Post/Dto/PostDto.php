<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use DateTimeInterface;
use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Post\Comment\Dto\CommentDto;
use Stessaluna\User\Dto\UserDto;

class PostDto
{
    public int $id;

    public DateTimeInterface $createdAt;

    public UserDto $author;
    
    public string $channel;

    public ?string $text = null;

    public ?string $image = null;

    public ?ExerciseDto $exercise = null;

    /** @var CommentDto[] */
    public array $comments;
}