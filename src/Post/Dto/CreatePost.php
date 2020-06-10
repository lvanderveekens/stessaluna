<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Dto\CreateExercise;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class CreatePost
{
    /** @var string */
    public $channel;

    /** @var string */
    public $text = null;

    /** @var UploadedFile */
    public $image = null;

    /** @var CreateExercise */
    public $exercise = null;
}