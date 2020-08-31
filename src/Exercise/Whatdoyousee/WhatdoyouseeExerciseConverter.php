<?php
declare(strict_types=1);

namespace Stessaluna\Exercise\Whatdoyousee;

use Stessaluna\Exercise\Answer\Answers;
use Stessaluna\Exercise\Answer\Entity\MissingwordAnswer;
use Stessaluna\Exercise\ExerciseService;
use Stessaluna\Exercise\Whatdoyousee\Dto\WhatdoyouseeExerciseDto;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Image\Dto\ImageToImageDtoMapper;
use Stessaluna\User\Entity\User;

class WhatdoyouseeExerciseConverter
{
    /** @var ExerciseService */
    private $exerciseService;

    /** @var ImageToImageDtoMapper */
    private $imageToImageDtoMapper;

    public function __construct(ExerciseService $exerciseService, ImageToImageDtoMapper $imageToImageDtoMapper)
    {
        $this->exerciseService = $exerciseService;
        $this->imageToImageDtoMapper = $imageToImageDtoMapper;
    }

    public function toDto(WhatdoyouseeExercise $exercise, ?User $user): WhatdoyouseeExerciseDto
    {
        $dto = new WhatdoyouseeExerciseDto();
        if ($exercise->getImage()) {
            $dto->image = $this->imageToImageDtoMapper->map($exercise->getImage());
        }
        $dto->option1 = $exercise->getOption1();
        $dto->option2 = $exercise->getOption2();
        $dto->option3 = $exercise->getOption3();
        $dto->option4 = $exercise->getOption4();

        $answers = $exercise->getAnswers()->toArray();
        $answer = Answers::findByUser($answers, $user);
        if ($answer !== null) {
            $dto->correct = $exercise->getCorrect();
            $dto->answer = $answer->getOption();
        }

        if ($this->exerciseService->isAuthor($exercise, $user)) {
            $dto->correct = $exercise->getCorrect();
        }
        $dto->correctAnswersPercentage = $this->calculateCorrectAnswersPercentage($exercise, $answers);
        return $dto;
    }

    private function calculateCorrectAnswersPercentage(WhatdoyouseeExercise $exercise, array $answers)
    {
        if (empty($answers)) {
            return 0;
        }

        $correctAnswerPercentageSum = 0;
        /** @var $answer MissingwordAnswer */
        foreach ($answers as $answer) {
            $isCorrect = $answer->getOption() === $exercise->getCorrect();
            $correctAnswerPercentageSum += $isCorrect ? 1 : 0;
        }

        return $correctAnswerPercentageSum / count($exercise->getAnswers());
    }
}
