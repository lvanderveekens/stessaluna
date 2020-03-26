<?php

namespace Stessaluna\Domain\Post\Exercise\Entity;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Domain\Exercise\Entity\Exercise;
use Stessaluna\Domain\Post\Entity\Post;

/**
 * @ORM\Entity
 */
class ExercisePost extends Post
{
    /**
     * @ORM\OneToOne(targetEntity="Stessaluna\Domain\Exercise\Entity\Exercise", orphanRemoval=true, cascade={"persist"})
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private Exercise $exercise;

    public function getExercise(): ?Exercise
    {
        return $this->exercise;
    }

    public function setExercise(Exercise $exercise): self
    {
        $this->exercise = $exercise;
        return $this;
    }
}
