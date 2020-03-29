<?php

namespace Stessaluna\Api\Exercise\Aorb\Dto;

use Stessaluna\Api\Exercise\Dto\ExerciseDto;

class AorbExerciseDto extends ExerciseDto {

    /** @var AorbSentenceDto[] */
    public array $sentences;

    public function __construct()
    {
        parent::__construct('aorb');
    }
}