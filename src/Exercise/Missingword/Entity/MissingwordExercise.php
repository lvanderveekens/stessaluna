<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Missingword\Entity;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\ExerciseType;

/**
 * @ORM\Entity
 */
class MissingwordExercise extends Exercise
{
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $textBefore;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $textAfter;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $option1;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $option2;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $option3;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $option4;

    /**
     * @ORM\Column(type="integer")
     */
    private $correct;

    public function __construct()
    {
        parent::__construct();
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

    public function getTextAfter(): ?string
    {
        return $this->textAfter;
    }

    public function setTextAfter(string $textAfter): self
    {
        $this->textAfter = $textAfter;

        return $this;
    }

    public function getOption1(): ?string
    {
        return $this->option1;
    }

    public function setOption1(string $option1): self
    {
        $this->option1 = $option1;

        return $this;
    }

    public function getOption2(): ?string
    {
        return $this->option2;
    }

    public function setOption2(string $option2): self
    {
        $this->option2 = $option2;

        return $this;
    }

    public function getOption3(): ?string
    {
        return $this->option3;
    }

    public function setOption3(string $option3): self
    {
        $this->option3 = $option3;

        return $this;
    }

    public function getOption4(): ?string
    {
        return $this->option4;
    }

    public function setOption4(string $option4): self
    {
        $this->option4 = $option4;

        return $this;
    }

    public function getCorrect(): ?int
    {
        return $this->correct;
    }

    public function setCorrect(int $correct): self
    {
        $this->correct = $correct;

        return $this;
    }

    public function getType(): string
    {
        return ExerciseType::MISSING_WORD;
    }

    public function equals(Exercise $other): bool
    {
        if (!($other instanceof MissingwordExercise)) {
            return false;
        }
        return $this->textBefore == $other->textBefore
            && $this->textAfter == $other->textAfter
            && $this->option1 == $other->option1
            && $this->option2 == $other->option2
            && $this->option3 == $other->option3
            && $this->option4 == $other->option4
            && $this->correct == $other->correct;
    }
}