<?php

namespace Stessaluna\Api\Exercise\Dto;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Post\Entity\Post;

abstract class ExerciseDto
{
    private string $type;

    public function __construct(string $type)
    {
        $this->type = $type;
    }

    public function getType(): string
    {
        return $this->type;
    }
}
