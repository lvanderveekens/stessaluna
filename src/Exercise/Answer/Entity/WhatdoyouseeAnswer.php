<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class WhatdoyouseeAnswer extends Answer
{
    public function getOption(): int
    {
        return $this->value;
    }

    public function setOption(int $option): self
    {
        $this->value = $option;
        return $this;
    }
}