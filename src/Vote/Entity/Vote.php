<?php
declare(strict_types=1);

namespace Stessaluna\Vote\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Comment\Entity\Comment;
use Stessaluna\Post\Entity\Post;
use Stessaluna\User\Entity\User;

/**
 * @ORM\Entity
 */
class Vote
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
     * @ORM\ManyToOne(targetEntity="Stessaluna\User\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     *
     * @var User
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @var string
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="Stessaluna\Post\Entity\Post")
     * @ORM\JoinColumn(nullable=true)
     *
     * @var Post|null
     */
    private $post;

    /**
     * @ORM\ManyToOne(targetEntity="Stessaluna\Comment\Entity\Comment")
     * @ORM\JoinColumn(nullable=true)
     *
     * @var Comment|null
     */
    private $comment;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): self
    {
        $this->post = $post;
        return $this;
    }

    public function getComment(): ?Comment
    {
        return $this->comment;
    }

    public function setComment(?Comment $comment): self
    {
        $this->comment = $comment;
        return $this;
    }
}