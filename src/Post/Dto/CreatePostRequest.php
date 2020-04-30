<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Dto\CreateExerciseRequest;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class CreatePostRequest
{
    public ?string $text;

    public ?UploadedFile $image;

    public ?CreateExerciseRequest $exercise;
}