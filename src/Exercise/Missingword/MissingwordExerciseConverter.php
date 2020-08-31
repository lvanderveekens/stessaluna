<?php
declare(strict_types=1);

namespace Stessaluna\Exercise\Missingword;

use Stessaluna\Exercise\Answer\Answers;
use Stessaluna\Exercise\Answer\Entity\MissingwordAnswer;
use Stessaluna\Exercise\ExerciseService;
use Stessaluna\Exercise\Missingword\Dto\MissingwordExerciseDto;
use Stessaluna\Exercise\Missingword\Entity\MissingwordExercise;
use Stessaluna\User\Entity\User;

class MissingwordExerciseConverter
{
    /** @var ExerciseService */
    private $exerciseService;

    public function __construct(ExerciseService $exerciseService)
    {
        $this->exerciseService = $exerciseService;
    }

    public function toDto(MissingwordExercise $exercise, ?User $user): MissingwordExerciseDto
    {
        $dto = new MissingwordExerciseDto();
        $dto->textBefore = $exercise->getTextBefore();
        $dto->textAfter = $exercise->getTextAfter();
        $dto->option1 = $exercise->getOption1();
        $dto->option2 = $exercise->getOption2();
        $dto->option3 = $exercise->getOption3();
        $dto->option4 = $exercise->getOption4();

        $answers = $exercise->getAnswers()->toArray();
        $answer = Answers::findByUser($answers, $user);
        if (isset($answer)) {
            $dto->correct = $exercise->getCorrect();
            $dto->answer = $answer->getOption();
        }

        if ($this->exerciseService->isAuthor($exercise, $user)) {
            $dto->correct = $exercise->getCorrect();
        }
        $dto->correctAnswersPercentage = $this->calculateCorrectAnswersPercentage($exercise, $answers);
        return $dto;
    }

    private function calculateCorrectAnswersPercentage(MissingwordExercise $exercise, array $answers)
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
