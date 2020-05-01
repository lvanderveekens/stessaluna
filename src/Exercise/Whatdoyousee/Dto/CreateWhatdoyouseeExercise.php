<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Whatdoyousee\Dto;

use Stessaluna\Exercise\Dto\CreateExercise;
use Stessaluna\Exercise\ExerciseType;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class CreateWhatdoyouseeExercise extends CreateExercise
{
    public UploadedFile $image;

    public string $option1;

    public string $option2;

    public string $option3;

    public string $option4;

    public int $correct;

    public function __construct()
    {
        parent::__construct(ExerciseType::WHAT_DO_YOU_SEE);
    }
}