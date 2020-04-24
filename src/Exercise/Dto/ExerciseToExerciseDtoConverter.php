<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

use Stessaluna\Exercise\Answer\Aorb\Entity\AorbAnswer;
use Stessaluna\Exercise\Answer\Entity\Answer;
use Stessaluna\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\Whatdoyousee\Dto\WhatdoyouseeExerciseDto;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Image\ImageStorage;
use Stessaluna\User\Entity\User;

class ExerciseToExerciseDtoConverter
{
    private ImageStorage $imageStorage;

    public function __construct(ImageStorage $imageStorage)
    {
        $this->imageStorage = $imageStorage;
    }

    public function convert(Exercise $exercise, User $user): ExerciseDto
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
        } elseif ($exercise instanceof WhatdoyouseeExercise) {
            // TODO: move to own converter?
            $dto = new WhatdoyouseeExerciseDto();
            $dto->image = $this->imageStorage->getRelativePath($exercise->getImageFilename());
            $dto->option1 = $exercise->getOption1();
            $dto->option2 = $exercise->getOption2();
            $dto->option3 = $exercise->getOption3();
            $dto->option4 = $exercise->getOption4();
            $dto->correct = $exercise->getCorrect();
        }

        $dto->id = $exercise->getId();
        return $dto;
    }
}