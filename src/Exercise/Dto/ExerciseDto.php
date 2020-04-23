<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

abstract class ExerciseDto
{
    public int $id;

    private string $type;

    public function __construct(string $type)
    {
        $this->type = $type;
    }

    public function getType(): string
    {
        return $this->type;
    }
}