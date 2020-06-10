<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

abstract class ExerciseDto
{
    /** @var int */
    public $id;

    /** @var string */
    public $type;

    /** @var int */
    public $answerCount;

    protected function __construct(string $type)
    {
        $this->type = $type;
    }
}