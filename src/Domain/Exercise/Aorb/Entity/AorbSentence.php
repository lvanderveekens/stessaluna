<?php

namespace Stessaluna\Domain\Exercise\Aorb\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class AorbSentence
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $textBefore;

    /** 
     * @ORM\Embedded(class = "AorbChoice") 
     */
    private $choice;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $textAfter;

    /**
     * @ORM\ManyToOne(targetEntity="AorbExercise", inversedBy="sentences")
     * @ORM\JoinColumn(nullable=false)
     */
    private $exercise;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTextBefore(): ?string
    {
        return $this->textBefore;
    }

    public function setTextBefore(string $textBefore): self
    {
        $this->textBefore = $textBefore;

        return $this;
    }

    public function getChoice(): ?AorbChoice
    {
        return $this->choice;
    }

    public function setChoice(AorbChoice $choice): self
    {
        $this->choice = $choice;

        return $this;
    }

    public function getTextAfter(): ?string
    {
        return $this->textAfter;
    }

    public function setTextAfter(string $textAfter): self
    {
        $this->textAfter = $textAfter;

        return $this;
    }

    public function getExercise(): ?AorbExercise
    {
        return $this->exercise;
    }

    public function setExercise(?AorbExercise $exercise): self
    {
        $this->exercise = $exercise;

        return $this;
    }
}
