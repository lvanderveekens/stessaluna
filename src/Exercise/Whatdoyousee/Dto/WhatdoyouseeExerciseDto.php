<?php

namespace Stessaluna\Exercise\Whatdoyousee\Dto;

use Stessaluna\Exercise\Dto\ExerciseDto;

class WhatdoyouseeExerciseDto extends ExerciseDto {

    public string $image;

    public string $option1;

    public string $option2;

    public string $option3;

    public string $option4;

    public int $correct;

    public function __construct()
    {
        parent::__construct('whatdoyousee');
    }
}