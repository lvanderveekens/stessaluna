<?php

namespace Stessaluna\Api\Exercise\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Exercise\Entity\Exercise;

class ExerciseDtoConverter
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function toDto(Exercise $exercise): ExerciseDto
    {
        $dto = null;
        if ($exercise instanceof AorbExercise) {
            $dto = new AorbExerciseDto();

            $sentences = array_map(function ($s) {
                $choice = new AorbChoiceDto();
                $choice->a = $s->getChoice()->getA();
                $choice->b = $s->getChoice()->getB();

                $sentence = new AorbSentenceDto();
                $sentence->textBefore = $s->getTextBefore();
                $sentence->choice = $choice;
                $sentence->textAfter = $s->getTextAfter();

                return $sentence;
            }, $exercise->getSentences()->toArray());

            $dto->sentences = $sentences;
        }
        $dto->id = $exercise->getId();
        return $dto;
    }
}
