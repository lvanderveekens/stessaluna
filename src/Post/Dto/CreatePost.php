<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Dto\CreateExercise;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class CreatePost
{
    public ?string $text = null;

    public ?UploadedFile $image = null;

    public ?CreateExercise $exercise = null;
}