<?php
declare(strict_types=1);

namespace Stessaluna\Post\Entity;

use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Image\Entity\Image;
use Stessaluna\Post\Comment\Entity\Comment;
use Stessaluna\User\Entity\User;

/**
 * @ORM\Entity
 */
class Post
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @var int
     */
    private $id = null;

    /**
     * @ORM\Column(type="datetime")
     *
     * @var DateTimeInterface
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="Stessaluna\User\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     *
     * @var User
     */
    private $author;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @var string
     */
    private $channel;

    /**
     * @ORM\Column(type="text", nullable=true)
     *
     * @var string
     */
    private $text = null;

    /**
     * @ORM\OneToOne(targetEntity="Stessaluna\Image\Entity\Image")
     * @ORM\JoinColumn(name="image_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @var Image
     */
    private $image = null;

    /**
     * @ORM\OneToOne(targetEntity="Stessaluna\Exercise\Entity\Exercise", orphanRemoval=true, cascade={"persist"})
     * @ORM\JoinColumn(nullable=true, onDelete="CASCADE")
     *
     * @var Exercise
     */
    private $exercise = null;

    /**
     * @ORM\OneToMany(targetEntity="Stessaluna\Post\Comment\Entity\Comment", mappedBy="post")
     *
     * @var Comment[]
     */
    private $comments;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
    }

    public function getId(): int
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

    public function getChannel(): string
    {
        return $this->channel;
    }

    public function setChannel(?string $channel): self
    {
        $this->channel = $channel;
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

    public function getImage(): ?Image
    {
        return $this->image;
    }

    public function setImage(?Image $image): self
    {
        $this->image = $image;

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