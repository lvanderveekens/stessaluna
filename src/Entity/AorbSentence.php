<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AorbSentenceRepository")
 */
class AorbSentence
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $textBefore;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $choiceA;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $choiceB;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $textAfter;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\AorbPost", inversedBy="sentences")
     * @ORM\JoinColumn(nullable=false)
     */
    private $post;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTextBefore(): ?string
    {
        return $this->textBefore;
    }

    public function setTextBefore(string $textBefore): self
    {
        $this->textBefore = $textBefore;

        return $this;
    }

    public function getChoiceA(): ?string
    {
        return $this->choiceA;
    }

    public function setChoiceA(string $choiceA): self
    {
        $this->choiceA = $choiceA;

        return $this;
    }

    public function getChoiceB(): ?string
    {
        return $this->choiceB;
    }

    public function setChoiceB(string $choiceB): self
    {
        $this->choiceB = $choiceB;

        return $this;
    }

    public function getTextAfter(): ?string
    {
        return $this->textAfter;
    }

    public function setTextAfter(string $textAfter): self
    {
        $this->textAfter = $textAfter;

        return $this;
    }

    public function getPost(): ?AorbPost
    {
        return $this->post;
    }

    public function setPost(?AorbPost $post): self
    {
        $this->post = $post;

        return $this;
    }
}
