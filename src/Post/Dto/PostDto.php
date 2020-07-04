<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use DateTimeInterface;
use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Image\Dto\ImageDto;
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

    /** @var ImageDto */
    public $image = null;

    /** @var ExerciseDto */
    public $exercise = null;

    /** @var CommentDto[] */
    public $comments;
}