<?php

namespace Stessaluna\Domain\Post\Text\Entity;

use Stessaluna\Entity\Post;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class TextPost extends Post
{

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $text;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $imageFilename;

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;
        return $this;
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
}
