<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Exercise\Answer\Entity\Answer;

/**
 * @ORM\Entity
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     "aorb" = "Stessaluna\Exercise\Aorb\Entity\AorbExercise",
 *     "whatdoyousee" = "Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise"
 * })
 */
abstract class Exercise
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(
     *     targetEntity="Stessaluna\Exercise\Answer\Entity\Answer",
     *     mappedBy="exercise",
     *     orphanRemoval=true,
     *     cascade={"persist"}
     * )
     */
    private $answers;

    public function __construct()
    {
        $this->answers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Answer[]
     */
    public function getAnswers(): Collection
    {
        return $this->answers;
    }

    public function addAnswer(Answer $answer): self
    {
        if (!$this->answers->contains($answer)) {
            $this->answers[] = $answer;
            $answer->setExercise($this);
        }
        return $this;
    }

    public function removeAnswer(Answer $answer): self
    {
        if ($this->answers->contains($answer)) {
            $this->answers->removeElement($answer);
            // set the owning side to null (unless already changed)
            if ($answer->getExercise() === $this) {
                // TODO: check if answer is still removed when deleting an exercise
                // $answer->setExercise(null);
            }
        }

        return $this;
    }
}