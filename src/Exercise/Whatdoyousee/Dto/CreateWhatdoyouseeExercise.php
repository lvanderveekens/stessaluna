<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Whatdoyousee\Dto;

use Stessaluna\Exercise\Dto\CreateExercise;
use Stessaluna\Exercise\ExerciseType;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class CreateWhatdoyouseeExercise extends CreateExercise
{
    /** @var UploadedFile */
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
    public $correct;

    public function __construct()
    {
        parent::__construct(ExerciseType::WHAT_DO_YOU_SEE);
    }
}