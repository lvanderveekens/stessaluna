<?php

namespace Stessaluna\Domain\Exercise\Repository;

use Stessaluna\Domain\Exercise\Entity\Exercise;

interface ExerciseRepository
{
    function findById(int $id): Exercise;
}