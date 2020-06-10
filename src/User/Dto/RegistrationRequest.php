<?php


namespace Stessaluna\User\Dto;


class RegistrationRequest
{
    /** @var string */
    public $email;

    /** @var string */
    public $username;

    /** @var string */
    public $password;

    /** @var string */
    public $country;
}