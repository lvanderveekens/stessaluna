<?php
declare(strict_types=1);

namespace Stessaluna\Exercise\Whatdoyousee\Dto;

use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Exercise\ExerciseType;
use Stessaluna\Image\Dto\ImageDto;

class WhatdoyouseeExerciseDto extends ExerciseDto
{
    /** @var ImageDto */
    public $image;

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
        parent::__construct(ExerciseType::WHAT_DO_YOU_SEE);
    }
}