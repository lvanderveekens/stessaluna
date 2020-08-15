<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use DateTimeInterface;
use Stessaluna\Comment\Dto\CommentDto;
use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Image\Dto\ImageDto;
use Stessaluna\User\Dto\UserDto;
use Stessaluna\Vote\Dto\VoteDto;

class PostDto
{
    /**
     * @var int
     */
    public $id;

    /**
     * @var DateTimeInterface
     */
    public $createdAt;

    /**
     * @var DateTimeInterface
     */
    public $modifiedAt;

    /**
     * @var UserDto
     */
    public $author;

    /**
     * @var string
     */
    public $channel;

    /**
     * @var string
     */
    public $text = null;

    /**
     * @var ImageDto
     */
    public $image = null;

    /**
     * @var VoteDto[]
     */
    public $votes;

    /**
     * @var ExerciseDto
     */
    public $exercise = null;

    /**
     * @var CommentDto[]
     */
    public $comments;
}