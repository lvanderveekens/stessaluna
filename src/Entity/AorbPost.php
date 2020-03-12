<?php

namespace App\Entity;

use App\Entity\Post;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class AorbPost extends Post
{
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $testje;

    public function getTestje(): ?string
    {
        return $this->testje;
    }

    public function setTestje(string $testje): self
    {
        $this->testje = $testje;
        return $this;
    }
}
