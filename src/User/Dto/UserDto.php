<?php

namespace Stessaluna\User\Dto;

use Stessaluna\Image\Dto\ImageDto;

class UserDto
{
    /** @var int */
    public $id;

    /** @var string */
    public $email;

    /** @var string */
    public $username;

    /** @var string */
    public $displayName = null;

    /** @var string */
    public $country;

    /** @var ImageDto */
    public $avatar = null;
}