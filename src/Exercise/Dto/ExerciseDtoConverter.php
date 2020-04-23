<?php

namespace Stessaluna\Exercise\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Exercise\Answer\Aorb\Entity\AorbAnswer;
use Stessaluna\Exercise\Answer\Entity\Answer;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\User\Entity\User;

class ExerciseDtoConverter
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

            $sentences = $exercise->getSentences();
            $sentenceDtos = array_map(function (int $i, AorbSentence $sentence) use ($answer) {
                $dto = new AorbSentenceDto();
                $dto->textBefore = $sentence->textBefore;

                $choiceDto = new AorbChoiceDto();
                $choiceDto->a = $sentence->choice->a;
                $choiceDto->b = $sentence->choice->b;

                if (isset($answer)) {
                    $choiceDto->correct = $sentence->choice->correct;
                    $choiceDto->answer = $answer->getChoices()[$i];
                }

                $dto->choice = $choiceDto;
                $dto->textAfter = $sentence->textAfter;
                return $dto;
            }, array_keys($sentences), $sentences);

            $dto->sentences = $sentenceDtos;
        }

        $dto->id = $exercise->getId();
        return $dto;
    }
}