<?php

namespace Stessaluna\Exercise\Aorb\Dto;

use Stessaluna\Exercise\Dto\ExerciseDto;

class AorbExerciseDto extends ExerciseDto {

    /** @var AorbSentenceDto[] */
    public array $sentences;

    public function __construct()
    {
        parent::__construct('aorb');
    }
}