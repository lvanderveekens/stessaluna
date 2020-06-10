<?php

namespace Stessaluna\Exercise\Aorb\Dto;

use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Exercise\ExerciseType;

class AorbExerciseDto extends ExerciseDto {

    /** @var AorbSentenceDto[] */
    public $sentences;

    public function __construct()
    {
        parent::__construct(ExerciseType::A_OR_B);
    }
}