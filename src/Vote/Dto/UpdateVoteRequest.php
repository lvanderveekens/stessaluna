<?php

declare(strict_types=1);

namespace Stessaluna\Vote\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class UpdateVoteRequest
{
    /**
     * @Assert\Choice(
     *     choices={"UP", "DOWN"},
     *     message="Field 'type' only supports 'UP' or 'DOWN'"
     * )
     *
     * @var string
     */
    public $type;
}