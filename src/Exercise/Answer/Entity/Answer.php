<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Entity;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\User\Entity\User;

/**
 * @ORM\Entity
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     "aorb"         = "AorbAnswer",
 *     "whatdoyousee" = "WhatdoyouseeAnswer",
 *     "missingword"  = "MissingwordAnswer",
 * })
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
     * @ORM\ManyToOne(targetEntity="Stessaluna\User\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     */
    private User $user;

    /**
     * @ORM\ManyToOne(targetEntity="Stessaluna\Exercise\Entity\Exercise", inversedBy="answers")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private Exercise $exercise;

    /**
     * @ORM\Column(name="value", type="json")
     */
    protected $value;

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