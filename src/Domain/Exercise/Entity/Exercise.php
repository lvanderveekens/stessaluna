<?php

namespace Stessaluna\Domain\Exercise\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Domain\Exercise\Answer\Entity\Answer;

/**
 * @ORM\Entity
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({"aorb" = "Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise"})
 */
abstract class Exercise
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\OneToMany(
     *     targetEntity="Stessaluna\Domain\Exercise\Answer\Entity\Answer", 
     *     mappedBy="exercise", 
     *     orphanRemoval=true, 
     *     cascade={"persist"}
     * )
     */
    private ArrayCollection $answers;

    public function __construct()
    {
        $this->answer = new ArrayCollection();
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
                $answer->setExercise(null);
            }
        }

        return $this;
    }
}
