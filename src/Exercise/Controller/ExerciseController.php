<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Controller;

use RuntimeException;
use Stessaluna\AbstractController;
use Stessaluna\Exercise\Answer\Dto\RequestToSubmitAnswerConverter;
use Stessaluna\Exercise\Answer\Dto\SubmitAorbAnswer;
use Stessaluna\Exercise\Answer\Dto\SubmitMissingwordAnswer;
use Stessaluna\Exercise\Answer\Dto\SubmitWhatdoyouseeAnswer;
use Stessaluna\Exercise\Answer\Entity\Answer;
use Stessaluna\Exercise\Answer\Entity\AorbAnswer;
use Stessaluna\Exercise\Answer\Entity\MissingwordAnswer;
use Stessaluna\Exercise\Answer\Entity\WhatdoyouseeAnswer;
use Stessaluna\Exercise\Dto\ExerciseToExerciseDtoConverter;
use Stessaluna\Exercise\Repository\ExerciseRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use function Functional\some;

/**
 * @Route("/api/exercises")
 */
class ExerciseController extends AbstractController
{
    /** @var ExerciseRepository */
    private $exerciseRepository;

    /** @var ExerciseToExerciseDtoConverter */
    private $exerciseToExerciseDtoConverter;

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
        $submitAnswer = RequestToSubmitAnswerConverter::convert($request);
        // TODO: block author from submitting an answer

        $exercise = $this->exerciseRepository->findById($id);

        $answers = $exercise->getAnswers()->toArray();
        $alreadyAnswered = some($answers, function (Answer $answer) { return $answer->getUser() == $this->getUser(); });
        if ($alreadyAnswered) {
            throw new BadRequestHttpException('User already submitted an answer for this exercise');
        }

        if ($exercise->getType() !== $submitAnswer->type) {
            throw new BadRequestHttpException('Answer type does not match exercise');
        }

        $answer = null;
        switch (true) {
            case $submitAnswer instanceof SubmitAorbAnswer:
                $answer = new AorbAnswer();
                $answer->setChoices($submitAnswer->choices);
                break;
            case $submitAnswer instanceof SubmitWhatdoyouseeAnswer:
                $answer = new WhatdoyouseeAnswer();
                $answer->setOption($submitAnswer->option);
                break;
            case $submitAnswer instanceof SubmitMissingwordAnswer:
                $answer = new MissingwordAnswer();
                $answer->setOption($submitAnswer->option);
                break;
            default:
                throw new RuntimeException('Failed to create an answer entity for type: '.$submitAnswer->type);
        }
        $answer->setUser($this->getUser());

        $exercise->addAnswer($answer);
        $exercise = $this->exerciseRepository->save($exercise);
        return $this->json($this->exerciseToExerciseDtoConverter->convert($exercise, $this->getUser()));
    }
}