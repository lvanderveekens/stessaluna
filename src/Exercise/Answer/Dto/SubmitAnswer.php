<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Dto;

abstract class SubmitAnswer
{
    /** @var string */
    public $type;

    protected function __construct(string $type)
    {
        $this->type = $type;
    }
}