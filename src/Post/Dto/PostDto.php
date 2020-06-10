<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use DateTimeInterface;
use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Post\Comment\Dto\CommentDto;
use Stessaluna\User\Dto\UserDto;

class PostDto
{
    /** @var int */
    public $id;

    /** @var DateTimeInterface */
    public $createdAt;

    /** @var UserDto */
    public $author;

    /** @var string */
    public $channel;

    /** @var string */
    public $text = null;

    /** @var string */
    public $image = null;

    /** @var ExerciseDto */
    public $exercise = null;

    /** @var CommentDto[] */
    public $comments;
}