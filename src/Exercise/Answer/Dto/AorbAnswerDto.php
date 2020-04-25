<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Dto;

use Stessaluna\Exercise\ExerciseType;

class AorbAnswerDto extends AnswerDto
{
    /** @var string[] an array containing 'a' and 'b' characters */
    public array $choices;

    public function __construct()
    {
        parent::__construct(ExerciseType::A_OR_B);
    }
}