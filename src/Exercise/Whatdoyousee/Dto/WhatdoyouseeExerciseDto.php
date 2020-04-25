<?php

namespace Stessaluna\Exercise\Whatdoyousee\Dto;

use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Exercise\ExerciseType;

class WhatdoyouseeExerciseDto extends ExerciseDto {

    public string $image;

    public string $option1;

    public string $option2;

    public string $option3;

    public string $option4;

    public int $correct;

    public ?int $answer;

    public function __construct()
    {
        parent::__construct(ExerciseType::WHAT_DO_YOU_SEE);
    }
}