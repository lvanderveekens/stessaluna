<?php
declare(strict_types=1);

namespace Stessaluna\Comment\Dto;

use Stessaluna\User\Dto\UserDto;
use Stessaluna\Vote\Dto\VoteDto;

class CommentDto
{
    /**
     * @var int
     */
    public $id;

    /**
     * @var string
     */
    public $text;

    /**
     * @var \DateTimeInterface
     */
    public $createdAt;

    /**
     * @var UserDto
     */
    public $user;

    /**
     * @var VoteDto[]
     */
    public $votes;
}