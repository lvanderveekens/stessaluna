<?php 

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

abstract class CreateExercise
{
    private string $type;

    protected function __construct(string $type)
    {
        $this->type = $type;
    }
}