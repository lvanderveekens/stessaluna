<?php

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Domain\Exercise\Answer\Aorb\Entity\AorbAnswer;
use Stessaluna\Domain\Exercise\Answer\Entity\Answer;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Domain\Exercise\Entity\Exercise;
use Stessaluna\Domain\User\Entity\User;

class ExerciseToDtoConverter
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function toDto(Exercise $exercise, User $user): ExerciseDto
    {
        $dto = null;

        if ($exercise instanceof AorbExercise) {
            $dto = new AorbExerciseDto();

            $answersFromUser = array_filter($exercise->getAnswers()->toArray(), function (Answer $answer) use ($user) {
                return $answer->getUser() == $user;
            });

            /** @var AorbAnswer */
            $answer = null;
            if (count($answersFromUser) > 0) {
                $answer = $answersFromUser[0];
            }

            $sentences = $exercise->getSentences()->toArray();
            $sentenceDtos = array_map(function (int $i, AorbSentence $s) use ($answer) {
                $choice = new AorbChoiceDto();
                $choice->a = $s->getChoice()->getA();
                $choice->b = $s->getChoice()->getB();

                if (isset($answer)) {
                    $choice->correct = $s->getChoice()->getCorrect();
                    $choice->answer = $answer->getChoices()[$i];
                }

                $sentence = new AorbSentenceDto();
                $sentence->textBefore = $s->getTextBefore();
                $sentence->choice = $choice;
                $sentence->textAfter = $s->getTextAfter();

                return $sentence;
            }, array_keys($sentences), $sentences);

            $dto->sentences = $sentenceDtos;

        }

        $dto->id = $exercise->getId();
        return $dto;
    }
}
