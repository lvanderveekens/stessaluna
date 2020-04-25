<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class AorbAnswer extends Answer
{
    /**
     * @return string[] an array containing 'a' and 'b' characters
     */
    public function getChoices(): ?array
    {
        return $this->value;
    }

    public function setChoices(?array $choices): self
    {
        $this->value = $choices;
        return $this;
    }
}