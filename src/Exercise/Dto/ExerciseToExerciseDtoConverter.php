<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

use Stessaluna\Exercise\Answer\Entity\Answer;
use Stessaluna\Exercise\Answer\Entity\AorbAnswer;
use Stessaluna\Exercise\Answer\Entity\MissingwordAnswer;
use Stessaluna\Exercise\Answer\Entity\WhatdoyouseeAnswer;
use Stessaluna\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\Missingword\Dto\MissingwordExerciseDto;
use Stessaluna\Exercise\Missingword\Entity\MissingwordExercise;
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
        $answer = $this->getAnswerFromUser($exercise, $user);

        $dto = null;
        if ($exercise instanceof AorbExercise) {
            $dto = $this->convertToAorbExerciseDto($exercise, $answer);
        } elseif ($exercise instanceof WhatdoyouseeExercise) {
            $dto = $this->convertToWhatdoyouseeExerciseDto($exercise, $answer);
        } elseif ($exercise instanceof MissingwordExercise) {
            $dto = $this->convertToMissingwordExerciseDto($exercise, $answer);
        }

        $dto->id = $exercise->getId();
        return $dto;
    }

    private function convertToAorbExerciseDto(AorbExercise $exercise, ?AorbAnswer $answer): AorbExerciseDto
    {
        $dto = new AorbExerciseDto();

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
        return $dto;
    }

    private function convertToWhatdoyouseeExerciseDto(
        WhatdoyouseeExercise $exercise,
        ?WhatdoyouseeAnswer $answer
    ): WhatdoyouseeExerciseDto {
        $dto = new WhatdoyouseeExerciseDto();
        $dto->image = $this->imageStorage->getRelativePath($exercise->getImageFilename());
        $dto->option1 = $exercise->getOption1();
        $dto->option2 = $exercise->getOption2();
        $dto->option3 = $exercise->getOption3();
        $dto->option4 = $exercise->getOption4();

        if (isset($answer)) {
            $dto->correct = $exercise->getCorrect();
            $dto->answer = $answer->getOption();
        }
        return $dto;
    }

    private function convertToMissingwordExerciseDto(
        MissingwordExercise $exercise,
        ?MissingwordAnswer $answer
    ): MissingwordExerciseDto {
        $dto = new MissingwordExerciseDto();
        $dto->textBefore = $exercise->getTextBefore();
        $dto->textAfter = $exercise->getTextAfter();
        $dto->option1 = $exercise->getOption1();
        $dto->option2 = $exercise->getOption2();
        $dto->option3 = $exercise->getOption3();
        $dto->option4 = $exercise->getOption4();

        if (isset($answer)) {
            $dto->correct = $exercise->getCorrect();
            $dto->answer = $answer->getOption();
        }
        return $dto;
    }

    private function getAnswerFromUser(Exercise $exercise, User $user): ?Answer
    {
        $answer = null;
        // TODO: use functional find?
        $answersFromUser = array_values(array_filter(
            $exercise->getAnswers()->toArray(),
            function (Answer $answer) use ($user) { return $answer->getUser() == $user; }
        ));

        if (count($answersFromUser) > 0) {
            $answer = $answersFromUser[0];
        }
        return $answer;
    }
}