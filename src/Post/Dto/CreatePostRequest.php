<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Image\Dto\ImageDto;

class CreatePostRequest
{
    /** @var string */
    public $channel;

    /** @var string */
    public $text = null;

    /** @var ImageDto */
    public $image = null;

    /** @var ExerciseDto */
    public $exercise = null;
}