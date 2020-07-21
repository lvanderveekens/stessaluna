<?php
declare(strict_types=1);


namespace Stessaluna\User\Dto;


use Stessaluna\Image\Dto\ImageDto;

class UpdateUserRequest
{
    /** @var ImageDto */
    public $avatar;

    /** @var string|null */
    public $displayName = null;

    /** @var string */
    public $country;
}