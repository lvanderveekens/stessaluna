<?php

namespace Stessaluna\Exercise\Missingword\Dto;

use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Exercise\ExerciseType;

class MissingwordExerciseDto extends ExerciseDto
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
    public $correct = null;

    /** @var int */
    public $answer = null;

    public function __construct()
    {
        parent::__construct(ExerciseType::MISSING_WORD);
    }
}