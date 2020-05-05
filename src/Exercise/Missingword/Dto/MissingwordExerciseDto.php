<?php

namespace Stessaluna\Exercise\Missingword\Dto;

use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Exercise\ExerciseType;

class MissingwordExerciseDto extends ExerciseDto
{
    public string $textBefore;

    public string $textAfter;

    public string $option1;

    public string $option2;

    public string $option3;

    public string $option4;

    public ?int $correct = null;

    public ?int $answer = null;

    public function __construct()
    {
        parent::__construct(ExerciseType::MISSING_WORD);
    }
}