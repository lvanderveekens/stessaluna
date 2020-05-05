<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Dto\CreateExercise;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class CreatePost
{
    public ?string $text;

    public ?UploadedFile $image;

    public ?CreateExercise $exercise;
}