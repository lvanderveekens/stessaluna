<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Aorb\Dto;

use Stessaluna\Exercise\Dto\CreateExercise;
use Stessaluna\Exercise\ExerciseType;

class CreateAorbExercise extends CreateExercise
{
    /** @var AorbSentenceDto[] */
    public array $sentences;

    public function __construct()
    {
        parent::__construct(ExerciseType::A_OR_B);
    }
}