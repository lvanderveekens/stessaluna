<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Aorb\Entity;

use Doctrine\ORM\Mapping as ORM;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\ExerciseType;

/**
 * @ORM\Entity
 */
class AorbExercise extends Exercise
{
    /**
     * @ORM\Column(type="json")
     */
    private array $sentences;

    public function __construct()
    {
        parent::__construct();
        $this->sentences = array();
    }

    /**
     * @return []
     */
    public function getSentences(): ?array
    {
        return array_map(function ($sentenceJson) {
            $sentence = new AorbSentence();
            $sentence->textBefore = $sentenceJson['textBefore'];

            $choice = new AorbChoice();
            $choice->a = $sentenceJson['choice']['a'];
            $choice->b = $sentenceJson['choice']['b'];
            $choice->correct = $sentenceJson['choice']['correct'];
            $sentence->choice = $choice;

            $sentence->textAfter = $sentenceJson['textAfter'];
            return $sentence;
        }, $this->sentences);
    }

    /**
     * @var AorbSentence[] sentences
     */
    public function setSentences(?array $sentences): self
    {
        $this->sentences = json_decode(json_encode($sentences), true);

        return $this;
    }

    public function getType(): string
    {
        return ExerciseType::A_OR_B;
    }
}