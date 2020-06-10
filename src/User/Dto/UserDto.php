<?php

namespace Stessaluna\User\Dto;

class UserDto
{
    /** @var int */
    public $id;

    /** @var string */
    public $email;

    /** @var string */
    public $username;

    /** @var string|null */
    public $displayName;

    /** @var string */
    public $country;

    /** @var string|null */
    public $avatar;
}