<?php

namespace Stessaluna\User\Dto;

class UserDto
{
    public int $id;

    public string $username;

    public ?string $firstName;

    public ?string $lastName;

    public string $country;

    public ?string $avatar;
}