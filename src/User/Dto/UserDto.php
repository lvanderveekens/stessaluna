<?php

namespace Stessaluna\User\Dto;

class UserDto
{
    public int $id;

    public string $username;

    public ?string $displayName;

    public string $country;

    public ?string $avatar;
}