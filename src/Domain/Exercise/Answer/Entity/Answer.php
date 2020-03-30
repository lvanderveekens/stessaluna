<?php

namespace Stessaluna\Domain\Exercise\Answer\Entity;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Domain\Exercise\Entity\Exercise;

/**
 * @ORM\Entity
 */
class Answer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(name="choices", type="array")
     */
    private array $choices;

    /**
     * @ORM\ManyToOne(targetEntity="Stessaluna\Domain\Exercise\Entity\Exercise", inversedBy="answers")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private Exercise $exercise;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string[]
     */
    public function getChoices(): array 
    {
        return $this->choices;
    }

    public function setChoices(array $choices) {
        $this->choices = $choices;
    }

    public function getExercise(): Exercise
    {
        return $this->exercise;
    }

    public function setExercise(Exercise $exercise): self
    {
        $this->exercise = $exercise;
        return $this;
    }
}
