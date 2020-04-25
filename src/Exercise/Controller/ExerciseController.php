<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Controller;

use function Functional\some;
use RuntimeException;
use Stessaluna\Exercise\Answer\Dto\AorbAnswerDto;
use Stessaluna\Exercise\Answer\Dto\WhatdoyouseeAnswerDto;
use Stessaluna\Exercise\Answer\Entity\Answer;
use Stessaluna\Exercise\Answer\Entity\AorbAnswer ;
use Stessaluna\Exercise\Answer\Entity\WhatdoyouseeAnswer;
use Stessaluna\Exercise\Dto\ExerciseToExerciseDtoConverter;
use Stessaluna\Exercise\Dto\RequestToAnswerDtoConverter;
use Stessaluna\Exercise\Repository\ExerciseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/exercises")
 */
class ExerciseController extends AbstractController
{
    private ExerciseRepository $exerciseRepository;

    private ExerciseToExerciseDtoConverter $exerciseToExerciseDtoConverter;

    public function __construct(
        ExerciseRepository $exerciseRepository,
        ExerciseToExerciseDtoConverter $exerciseToExerciseDtoConverter
    ) {
        $this->exerciseRepository = $exerciseRepository;
        $this->exerciseToExerciseDtoConverter = $exerciseToExerciseDtoConverter;
    }

    /**
     * @Route("/{id}/answers", methods={"POST"})
     */
    public function submitAnswer(int $id, Request $request): JsonResponse
    {
        $answerDto = RequestToAnswerDtoConverter::convert($request);
        $exercise = $this->exerciseRepository->findById($id);

        $answers = $exercise->getAnswers()->toArray();
        $alreadyAnswered = some($answers, function (Answer $answer) { return $answer->getUser() == $this->getUser(); });
        if ($alreadyAnswered) {
            throw new BadRequestHttpException('User already submitted an answer for this exercise');
        }

        if ($exercise->getType() !== $answerDto->type) {
            throw new BadRequestHttpException('Answer type does not match exercise');
        }

        switch (true) {
            case $answerDto instanceof AorbAnswerDto:
                $answer = new AorbAnswer();
                $answer->setChoices($answerDto->choices);
                break;
            case $answerDto instanceof WhatdoyouseeAnswerDto:
                $answer = new WhatdoyouseeAnswer();
                $answer->setOption($answerDto->option);
                break;
            default:
                throw new RuntimeException('Failed to create an answer entity for type: '.$answerDto->type);
        }

        $answer->setUser($this->getUser());

        $exercise->addAnswer($answer);
        $exercise = $this->exerciseRepository->save($exercise);
        return $this->json($this->exerciseToExerciseDtoConverter->convert($exercise, $this->getUser()));
    }
}