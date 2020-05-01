<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Missingword\Dto;

use Stessaluna\Exercise\Dto\CreateExercise;
use Stessaluna\Exercise\ExerciseType;

class CreateMissingwordExercise extends CreateExercise
{
    public string $textBefore;

    public string $textAfter;

    public string $option1;

    public string $option2;

    public string $option3;

    public string $option4;

    public int $correct;

    public function __construct()
    {
        parent::__construct(ExerciseType::MISSING_WORD);
    }
}