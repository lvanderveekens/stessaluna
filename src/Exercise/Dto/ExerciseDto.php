<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

abstract class ExerciseDto
{
    public int $id;

    public string $type;

    public int $answerCount;

    protected function __construct(string $type)
    {
        $this->type = $type;
    }
}