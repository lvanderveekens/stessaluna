<?php

namespace Stessaluna\Domain\Exercise\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({"aorb" = "Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise"})
 */
abstract class Exercise
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
