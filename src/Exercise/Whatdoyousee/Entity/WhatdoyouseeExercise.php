<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Whatdoyousee\Entity;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Exercise\Entity\Exercise;

/**
 * @ORM\Entity
 */
class WhatdoyouseeExercise extends Exercise
{
    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $imageFilename;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $option1;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $option2;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $option3;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $option4;

    /**
     * @ORM\Column(type="integer")
     */
    private int $correct;

    public function __construct()
    {
        parent::__construct();
    }

    public function getImageFilename(): ?string
    {
        return $this->imageFilename;
    }

    public function setImageFilename(?string $imageFilename): self
    {
        $this->imageFilename = $imageFilename;

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
}