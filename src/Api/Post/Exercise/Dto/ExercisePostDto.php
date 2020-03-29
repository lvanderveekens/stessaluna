<?php

namespace Stessaluna\Api\Post\Exercise\Dto;

use Stessaluna\Api\Exercise\Dto\ExerciseDto;
use Stessaluna\Api\Post\Dto\PostDto;

class ExercisePostDto extends PostDto
{
    public ExerciseDto $exercise;

    public function __construct()
    {
        parent::__construct('exercise');
    }
}