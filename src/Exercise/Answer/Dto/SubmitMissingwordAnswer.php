<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Dto;

use Stessaluna\Exercise\ExerciseType;

class SubmitMissingwordAnswer extends SubmitAnswer
{
    /** @var int */
    public $option;

    public function __construct()
    {
        parent::__construct(ExerciseType::MISSING_WORD);
    }
}