<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

use Psr\Log\LoggerInterface;
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
use Stessaluna\Image\Storage\ImageStorage;
use Stessaluna\Post\Repository\PostRepository;
use Stessaluna\User\Entity\User;

class ExerciseToExerciseDtoConverter
{
    /**
     * @var ImageStorage
     */
    private $imageStorage;
    /**
     * @var PostRepository
     */
    private $postRepository;
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(ImageStorage $imageStorage, PostRepository $postRepository, LoggerInterface $logger)
    {
        $this->imageStorage = $imageStorage;
        $this->postRepository = $postRepository;
        $this->logger = $logger;
    }

    public function convert(Exercise $exercise, ?User $user): ExerciseDto
    {
        $answers = $exercise->getAnswers()->toArray();
        $answer = $user ? $this->findAnswerFromUser($answers, $user) : null;

        $dto = null;
        if ($exercise instanceof AorbExercise) {
            $dto = $this->convertToAorbExerciseDto($exercise, $answer, $user);
        } elseif ($exercise instanceof WhatdoyouseeExercise) {
            $dto = $this->convertToWhatdoyouseeExerciseDto($exercise, $answer, $user);
        } elseif ($exercise instanceof MissingwordExercise) {
            $dto = $this->convertToMissingwordExerciseDto($exercise, $answer, $user);
        }

        $dto->id = $exercise->getId();
        $dto->answerCount = count($answers);
        return $dto;
    }

    private function convertToAorbExerciseDto(AorbExercise $exercise, ?AorbAnswer $answer, ?User $user): AorbExerciseDto
    {
        $dto = new AorbExerciseDto();
        $sentences = $exercise->getSentences();
        $isAuthor = $this->isAuthor($user, $exercise);

        $sentenceDtos = array_map(function (int $i, AorbSentence $sentence) use ($answer, $isAuthor) {
            $sentenceAnswer = $answer ? $answer->getChoices()[$i] : null;
            return $this->convertToSentenceDto($sentence, $sentenceAnswer, $isAuthor);
        }, array_keys($sentences), $sentences);

        $dto->sentences = $sentenceDtos;
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

    private function isAuthor(?User $user, Exercise $exercise): bool {
        if (empty($user)) {
            return false;
        }
        $post = $this->postRepository->findByExerciseId($exercise->getId());
        return $user->getId() == $post->getAuthor()->getId();
    }

    private function convertToWhatdoyouseeExerciseDto(
        WhatdoyouseeExercise $exercise,
        ?WhatdoyouseeAnswer $answer,
        ?User $user
    ): WhatdoyouseeExerciseDto
    {
        $dto = new WhatdoyouseeExerciseDto();
        $dto->image = $this->imageStorage->getUrl($exercise->getImageFilename());
        $dto->option1 = $exercise->getOption1();
        $dto->option2 = $exercise->getOption2();
        $dto->option3 = $exercise->getOption3();
        $dto->option4 = $exercise->getOption4();

        if (isset($answer)) {
            $dto->correct = $exercise->getCorrect();
            $dto->answer = $answer->getOption();
        }

        if ($this->isAuthor($user, $exercise)) {
            $dto->correct = $exercise->getCorrect();
        }

        return $dto;
    }

    private function convertToMissingwordExerciseDto(
        MissingwordExercise $exercise,
        ?MissingwordAnswer $answer,
        ?User $user
    ): MissingwordExerciseDto
    {
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

        if ($this->isAuthor($user, $exercise)) {
            $dto->correct = $exercise->getCorrect();
        }
        return $dto;
    }

    private function findAnswerFromUser(array $answers, User $user): ?Answer
    {
        $answer = null;
        // TODO: use functional find?
        $answersFromUser = array_values(array_filter(
            $answers,
            function (Answer $answer) use ($user) { return $answer->getUser() == $user; }
        ));

        if (count($answersFromUser) > 0) {
            $answer = $answersFromUser[0];
        }
        return $answer;
    }
}