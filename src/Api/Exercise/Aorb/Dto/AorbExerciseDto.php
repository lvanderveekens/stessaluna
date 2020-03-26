<?php

namespace Stessaluna\Api\Exercise\Aorb\Dto;

use Stessaluna\Api\Exercise\Dto\ExerciseDto;

class AorbExerciseDto extends ExerciseDto {

    private $sentences;

    public function __construct()
    {
        parent::__construct('aorb');
    }

    /**
     * @param AorbSentenceDto[] $sentences
     */
    public function setSentences(array $sentences)
    {
        $this->sentences = $sentences;
    }

    /**
     * @return AorbSentenceDto[]
     */
    public function getSentences(): array
    {
        return $this->sentences;
    }
}