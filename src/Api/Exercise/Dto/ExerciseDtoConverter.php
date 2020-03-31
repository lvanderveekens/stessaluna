<?php

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Answer\Dto\AnswerDtoConverter;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Domain\Exercise\Answer\Entity\Answer;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Domain\Exercise\Entity\Exercise;
use Stessaluna\Domain\User\Entity\User;

class ExerciseDtoConverter
{
    private LoggerInterface $logger;

    private AnswerDtoConverter $answerDtoConverter;

    public function __construct(LoggerInterface $logger, AnswerDtoConverter $answerDtoConverter)
    {
        $this->logger = $logger;
        $this->answerDtoConverter = $answerDtoConverter;
    }

    public function toDto(Exercise $exercise, User $user): ExerciseDto
    {
        $dto = null;

        if ($exercise instanceof AorbExercise) {
            $dto = new AorbExerciseDto();

            $answersFromUser = array_filter($exercise->getAnswers()->toArray(), function (Answer $answer) use ($user) {
                return $answer->getUser() == $user;
            });

            if (count($answersFromUser) > 0) {
                $dto->answer = $this->answerDtoConverter->toDto($answersFromUser[0]);
            }

            $sentences = array_map(function (AorbSentence $s) use ($dto) {
                $choice = new AorbChoiceDto();
                $choice->a = $s->getChoice()->getA();
                $choice->b = $s->getChoice()->getB();

                if (isset($dto->answer)) {
                    // already answered so return the correct values as well
                    $choice->correct = $s->getChoice()->getCorrect();
                }

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
