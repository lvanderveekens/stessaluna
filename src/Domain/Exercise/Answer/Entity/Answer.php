<?php

declare(strict_types=1);

namespace Stessaluna\Domain\Exercise\Answer\Entity;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Domain\Exercise\Answer\Aorb\Entity\AorbAnswer;
use Stessaluna\Domain\Exercise\Entity\Exercise;
use Stessaluna\Domain\User\Entity\User;

/**
 * @ORM\Entity
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({"aorb" = "Stessaluna\Domain\Exercise\Answer\Aorb\Entity\AorbAnswer"})
 */
abstract class Answer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

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
