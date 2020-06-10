<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Missingword\Dto;

use Stessaluna\Exercise\Dto\CreateExercise;
use Stessaluna\Exercise\ExerciseType;

class CreateMissingwordExercise extends CreateExercise
{
    /** @var string */
    public $textBefore;

    /** @var string */
    public $textAfter;

    /** @var string */
    public $option1;

    /** @var string */
    public $option2;

    /** @var string */
    public $option3;

    /** @var string */
    public $option4;

    /** @var int */
    public $correct;

    public function __construct()
    {
        parent::__construct(ExerciseType::MISSING_WORD);
    }
}