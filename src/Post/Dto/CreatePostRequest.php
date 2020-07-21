<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Image\Dto\ImageDto;

class CreatePostRequest
{
    /** @var string */
    public $channel;

    /** @var string|null */
    public $text = null;

    /** @var ImageDto|null */
    public $image = null;

    /** @var ExerciseDto|null */
    public $exercise = null;
}