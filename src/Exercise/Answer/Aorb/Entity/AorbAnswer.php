<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Aorb\Entity;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Exercise\Answer\Entity\Answer;

/**
 * @ORM\Entity
 */
class AorbAnswer extends Answer
{
    /**
     * @ORM\Column(name="choices", type="json_array")
     */
    private array $choices;

    /**
     * @return string[] an array containing 'a' and 'b' characters
     */
    public function getChoices(): array
    {
        return $this->choices;
    }

    public function setChoices(array $choices): self
    {
        $this->choices = $choices;
        return $this;
    }
}