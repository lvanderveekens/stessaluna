<?php

namespace Stessaluna\Domain\Post\Entity;

use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Domain\Exercise\Entity\Exercise;
use Stessaluna\Domain\User\Entity\User;

/**
 * @ORM\Entity
 */
class Post
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private ?int $id = null;

    /**
     * @ORM\Column(type="datetime")
     */
    private DateTimeInterface $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="Stessaluna\Domain\User\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     */
    private User $author;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $text = null;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $imageFilename = null;

    /**
     * @ORM\OneToOne(targetEntity="Stessaluna\Domain\Exercise\Entity\Exercise", orphanRemoval=true, cascade={"persist"})
     * @ORM\JoinColumn(nullable=true, onDelete="CASCADE")
     */
    private ?Exercise $exercise = null;

    /**
     * @ORM\OneToMany(targetEntity="Stessaluna\Domain\Post\Comment\Entity\Comment", mappedBy="post")
     */
    protected $comments;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getAuthor(): User
    {
        return $this->author;
    }

    public function setAuthor(User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): self
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

    public function getExercise(): ?Exercise
    {
        return $this->exercise;
    }

    public function setExercise(?Exercise $exercise): self
    {
        $this->exercise = $exercise;
        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }
}