<?php


namespace Stessaluna\User\Dto;


class RegistrationRequest
{
    public string $email;
    public string $username;
    public string $password;
    public string $country;
}