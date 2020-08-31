<?php
declare(strict_types=1);

namespace Stessaluna\Exercise\Aorb;

use Stessaluna\Exercise\Answer\Answers;
use Stessaluna\Exercise\Answer\Entity\AorbAnswer;
use Stessaluna\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Exercise\ExerciseService;
use Stessaluna\User\Entity\User;

class AorbExerciseConverter
{
    /** @var ExerciseService */
    private $exerciseService;

    public function __construct(ExerciseService $exerciseService)
    {
        $this->exerciseService = $exerciseService;
    }

    public function toDto(AorbExercise $exercise, ?User $user): AorbExerciseDto
    {
        $dto = new AorbExerciseDto();
        $sentences = $exercise->getSentences();
        $isAuthor = $this->exerciseService->isAuthor($exercise, $user);

        $answers = $exercise->getAnswers()->toArray();
        $answer = Answers::findByUser($answers, $user);

        $sentenceDtos = array_map(function (int $i, AorbSentence $sentence) use ($answer, $isAuthor) {
            $sentenceAnswer = $answer ? $answer->getChoices()[$i] : null;
            return $this->convertToSentenceDto($sentence, $sentenceAnswer, $isAuthor);
        }, array_keys($sentences), $sentences);

        $dto->sentences = $sentenceDtos;
        $dto->correctAnswersPercentage = $this->calculateCorrectAnswersPercentage($exercise, $answers);
        return $dto;
    }

    private function convertToSentenceDto(AorbSentence $sentence, ?string $answer, bool $isAuthor): AorbSentenceDto
    {
        $sentenceDto = new AorbSentenceDto();
        $sentenceDto->textBefore = $sentence->textBefore;

        $choiceDto = new AorbChoiceDto();
        $choiceDto->a = $sentence->choice->a;
        $choiceDto->b = $sentence->choice->b;
        if (isset($answer)) {
            $choiceDto->answer = $answer;
            $choiceDto->correct = $sentence->choice->correct;
        }
        if ($isAuthor) {
            $choiceDto->correct = $sentence->choice->correct;
        }
        $sentenceDto->choice = $choiceDto;

        $sentenceDto->textAfter = $sentence->textAfter;
        return $sentenceDto;
    }

    private function calculateCorrectAnswersPercentage(AorbExercise $exercise, array $answers)
    {
        if (empty($answers)) {
            return 0;
        }

        $correctAnswerPercentageSum = 0;

        /** @var $answer AorbAnswer */
        foreach ($answers as $answer) {
            $correctChoicesCount = 0;
            for ($i = 0; $i < count($exercise->getSentences()); $i++) {
                $userChoice = $answer->getChoices()[$i];
                $correctChoice = $exercise->getSentences()[$i]->choice->correct;

                if ($userChoice == $correctChoice) {
                    $correctChoicesCount++;
                }
            }
            $correctAnswerPercentage = $correctChoicesCount / count($exercise->getSentences());
            $correctAnswerPercentageSum += $correctAnswerPercentage;
        }

        return $correctAnswerPercentageSum / count($exercise->getAnswers());
    }
}
