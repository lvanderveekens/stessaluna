<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

use Symfony\Component\Serializer\Annotation\DiscriminatorMap;

/**
 * @DiscriminatorMap(typeProperty="type", mapping={
 *    "aorb"="Stessaluna\Exercise\Aorb\Dto\AorbExerciseDto",
 *    "whatdoyousee"="Stessaluna\Exercise\Whatdoyousee\Dto\WhatdoyouseeExerciseDto",
 *    "missingword"="Stessaluna\Exercise\Missingword\Dto\MissingwordExerciseDto"
 * })
 */
abstract class ExerciseDto
{
    /** @var int */
    public $id;

    /** @var string */
    public $type;

    /** @var int */
    public $answerCount;

    protected function __construct(string $type)
    {
        $this->type = $type;
    }
}