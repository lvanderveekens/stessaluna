<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Dto;

abstract class AnswerDto
{
    public string $type;

    protected function __construct(string $type)
    {
        $this->type = $type;
    }
}