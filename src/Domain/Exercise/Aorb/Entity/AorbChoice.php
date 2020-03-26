<?php

namespace Stessaluna\Domain\Exercise\Aorb\Entity;

use Doctrine\ORM\Mapping as ORM;

/** 
 * @ORM\Embeddable 
 */
class AorbChoice
{
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $a;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $b;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $correct;

    public function getA(): ?string
    {
        return $this->a;
    }

    public function setA(string $a): self
    {
        $this->a = $a;

        return $this;
    }

    public function getB(): ?string
    {
        return $this->b;
    }

    public function setB(string $b): self
    {
        $this->b = $b;

        return $this;
    }

    public function getCorrect(): ?string
    {
        return $this->correct;
    }

    public function setCorrect(string $correct): self
    {
        $this->correct = $correct;

        return $this;
    }
}
