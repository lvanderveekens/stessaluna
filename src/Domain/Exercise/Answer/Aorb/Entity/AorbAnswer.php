<?php

declare(strict_types=1);

namespace Stessaluna\Domain\Exercise\Answer\Aorb\Entity;

use Stessaluna\Domain\Exercise\Answer\Entity\Answer;
use Doctrine\ORM\Mapping as ORM;

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
     * @return string[]
     */
    public function getChoices(): array 
    {
        return $this->choices;
    }

    public function setChoices(array $choices): self {
        $this->choices = $choices;
        return $this;
    }
}
