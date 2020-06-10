<?php 

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

abstract class CreateExercise
{
    /** @var string */
    private $type;

    protected function __construct(string $type)
    {
        $this->type = $type;
    }
}