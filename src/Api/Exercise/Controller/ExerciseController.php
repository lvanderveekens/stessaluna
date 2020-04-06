<?php

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Controller;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Aorb\Dto\SubmitAorbAnswerRequestDto;
use Stessaluna\Api\Exercise\Dto\ExerciseToDtoConverter;
use Stessaluna\Api\Exercise\Dto\RequestToDtoConverter;
use Stessaluna\Domain\Exercise\Answer\Aorb\Entity\AorbAnswer;
use Stessaluna\Domain\Exercise\Answer\Entity\Answer;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Exercise\Repository\ExerciseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
    private static array $supportedRequestTypeByExercise = [
        AorbExercise::class => SubmitAorbAnswerRequestDto::class
    ];

    private LoggerInterface $logger;

    private ExerciseRepository $exerciseRepository;

    private ExerciseToDtoConverter $exerciseToDtoConverter;

    public function __construct(
        LoggerInterface $logger,
        ExerciseRepository $exerciseRepository,
        ExerciseToDtoConverter $exerciseToDtoConverter
    )
    {
        $this->logger = $logger;
        $this->exerciseRepository = $exerciseRepository;
        $this->exerciseToDtoConverter = $exerciseToDtoConverter;
    }

    /**
     * @Route("/{id}/answers", methods={"POST"})
     */
    public function submitAnswer(int $id, Request $request): JsonResponse
    {
        $request = RequestToDtoConverter::toSubmitAnswerRequestDto($request);
        $exercise = $this->exerciseRepository->findById($id);

        $answers = $exercise->getAnswers()->toArray();
        $alreadyAnswered = some($answers, function (Answer $answer) { return $answer->getUser() == $this->getUser(); });
        if ($alreadyAnswered) {
            throw new BadRequestHttpException("User already submitted an answer for this exercise");
        }

        if (self::$supportedRequestTypeByExercise[get_class($exercise)] !== get_class($request)) {
            throw new BadRequestHttpException("Answer type does not match exercise");
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
        return $this->json($this->exerciseToDtoConverter->toDto($exercise, $this->getUser()));
    }
}
