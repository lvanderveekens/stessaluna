<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Controller;

use function Functional\some;
use Stessaluna\Exercise\Answer\Aorb\Entity\AorbAnswer;
use Stessaluna\Exercise\Answer\Entity\Answer;
use Stessaluna\Exercise\Aorb\Dto\SubmitAorbAnswerRequestDto;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Dto\ExerciseToExerciseDtoConverter;
use Stessaluna\Exercise\Dto\RequestDtoConverter;
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
    private static array $supportedRequestTypeByExercise = array(
        AorbExercise::class => SubmitAorbAnswerRequestDto::class
    );

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
        $request = RequestDtoConverter::toSubmitAnswerRequestDto($request);
        $exercise = $this->exerciseRepository->findById($id);

        $answers = $exercise->getAnswers()->toArray();
        $alreadyAnswered = some($answers, function (Answer $answer) { return $answer->getUser() == $this->getUser(); });
        if ($alreadyAnswered) {
            throw new BadRequestHttpException('User already submitted an answer for this exercise');
        }

        if (self::$supportedRequestTypeByExercise[get_class($exercise)] !== get_class($request)) {
            throw new BadRequestHttpException('Answer type does not match exercise');
        }

        switch (true) {
            case $request instanceof SubmitAorbAnswerRequestDto:
                $answer = new AorbAnswer();
                $answer->setUser($this->getUser());
                $answer->setChoices($request->choices);
                break;
        }

        $exercise->addAnswer($answer);
        $exercise = $this->exerciseRepository->save($exercise);
        return $this->json($this->exerciseToExerciseDtoConverter->convert($exercise, $this->getUser()));
    }
}