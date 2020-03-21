<?php

namespace Stessaluna\Domain\Post\Aorb\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Domain\Post\Entity\Post;

/**
 * @ORM\Entity
 */
class AorbPost extends Post
{

    /**
     * @ORM\OneToMany(targetEntity="AorbSentence", mappedBy="post", orphanRemoval=true, cascade={"persist"})
     */
    private $sentences;

    public function __construct()
    {
        parent::__construct();
        $this->sentences = new ArrayCollection();
    }

    /**
     * @return Collection|AorbSentence[]
     */
    public function getSentences(): Collection
    {
        return $this->sentences;
    }

    public function addSentence(AorbSentence $sentence): self
    {
        if (!$this->sentences->contains($sentence)) {
            $this->sentences[] = $sentence;
            $sentence->setPost($this);
        }

        return $this;
    }

    public function removeSentence(AorbSentence $sentence): self
    {
        if ($this->sentences->contains($sentence)) {
            $this->sentences->removeElement($sentence);
            // set the owning side to null (unless already changed)
            if ($sentence->getPost() === $this) {
                $sentence->setPost(null);
            }
        }

        return $this;
    }
}