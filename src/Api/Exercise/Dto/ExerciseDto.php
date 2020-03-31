<?php

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Dto;

use Stessaluna\Api\Exercise\Answer\Dto\AnswerDto;

abstract class ExerciseDto
{
    public int $id;

    private string $type;

    public ?AnswerDto $answer = null;

    public function __construct(string $type)
    {
        $this->type = $type;
    }

    public function getType(): string
    {
        return $this->type;
    }

}
