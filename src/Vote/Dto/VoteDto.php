<?php
declare(strict_types=1);


namespace Stessaluna\Vote\Dto;


use Stessaluna\User\Dto\UserDto;

class VoteDto
{
    /**
     * @var int
     */
    public $id;

    /**
     * @var string 'UP' or 'DOWN'
     */
    public $type;

    /**
     * @var UserDto
     */
    public $user;
}