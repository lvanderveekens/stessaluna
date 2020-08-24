<?php
declare(strict_types=1);

namespace Stessaluna\Post\Entity;

use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Comment\Entity\Comment;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Image\Entity\Image;
use Stessaluna\User\Entity\User;
use Stessaluna\Vote\Entity\Vote;

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
     * @ORM\Column(type="datetime")
     *
     * @var DateTimeInterface
     */
    private $modifiedAt;

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
     * @ORM\OneToMany(targetEntity="Stessaluna\Vote\Entity\Vote", mappedBy="post")
     *
     * @var Vote[]
     */
    private $votes;

    /**
     * @ORM\OneToOne(targetEntity="Stessaluna\Exercise\Entity\Exercise", orphanRemoval=true, cascade={"persist"})
     * @ORM\JoinColumn(nullable=true, onDelete="CASCADE")
     *
     * @var Exercise
     */
    private $exercise = null;

    /**
     * @ORM\OneToMany(targetEntity="Stessaluna\Comment\Entity\Comment", mappedBy="post")
     *
     * @var Comment[]
     */
    private $comments;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->votes = new ArrayCollection();
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

    public function getModifiedAt(): \DateTimeInterface
    {
        return $this->modifiedAt;
    }

    public function setModifiedAt(\DateTimeInterface $modifiedAt): self
    {
        $this->modifiedAt = $modifiedAt;

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

    /**
     * @return Collection|Vote[]
     */
    public function getVotes(): Collection
    {
        return $this->votes;
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