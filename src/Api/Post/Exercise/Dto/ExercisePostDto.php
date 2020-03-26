<?php

namespace Stessaluna\Api\Post\Exercise\Dto;

use Stessaluna\Api\Exercise\Dto\ExerciseDto;
use Stessaluna\Api\Post\Dto\PostDto;

class ExercisePostDto extends PostDto
{
    private ExerciseDto $exercise;

    public function __construct()
    {
        parent::__construct('exercise');
    }

    public function setExercise(ExerciseDto $exercise) 
    {
        $this->exercise = $exercise;
    }

    public function getExercise(): ExerciseDto
    {
        return $this->exercise;
    }
}