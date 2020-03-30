<?php

namespace Stessaluna\Domain\Exercise\Answer\Entity;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Domain\Exercise\Entity\Exercise;
use Stessaluna\Domain\User\Entity\User;

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
    private $id;

    /**
     * @ORM\Column(name="choices", type="json_array")
     */
    private array $choices;

    /**
     * @ORM\ManyToOne(targetEntity="Stessaluna\Domain\User\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     */
    private User $user;

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

    public function setChoices(array $choices): self {
        $this->choices = $choices;
        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
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
