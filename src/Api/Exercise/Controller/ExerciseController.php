<?php

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Controller;

use Exception;
use Psr\Log\LoggerInterface;
use stdClass;
use Stessaluna\Api\Exercise\Dto\ExerciseDtoConverter;
use Stessaluna\Domain\Exercise\Answer\Entity\Answer;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Exercise\Entity\Exercise;
use Stessaluna\Domain\Exercise\Repository\ExerciseRepository;
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
    private LoggerInterface $logger;

    private ExerciseRepository $exerciseRepository;

    private ExerciseDtoConverter $exerciseDtoConverter;

    public function __construct(
        LoggerInterface $logger,
        ExerciseRepository $exerciseRepository,
        ExerciseDtoConverter $exerciseDtoConverter
    )
    {
        $this->logger = $logger;
        $this->exerciseRepository = $exerciseRepository;
        $this->exerciseDtoConverter = $exerciseDtoConverter;
    }

    /**
     * @Route("/{id}/answers", methods={"POST"})
     */
    public function submitAnswer(int $id, Request $req): JsonResponse
    {
        $request = toSubmitAnswerRequestDto($req);
        $exercise = $this->exerciseRepository->findById($id);

        // TODO: move validation logic to domain
        // TODO: check if answer type matches exercise

        if ($request instanceof SubmitAorbAnswerRequestDto) {
            if (!$exercise instanceof AorbExercise) {
                throw new BadRequestHttpException("Request type does not match exercise");
            }

            $answer = new Answer();
            $answer->setUser($this->getUser());
            $answer->setChoices($request->choices);

            $exercise->addAnswer($answer);
            $this->exerciseRepository->save($exercise);
            return $this->json(array('status' => 'ok'));
        }

        return $this->json($this->exerciseDtoConverter->toDto($exercise));
    }
}

// TODO: test <?php declare(strict_types=1);
function toSubmitAnswerRequestDto(Request $req): SubmitAnswerRequestDto
{
    $type = $req->get('type');
    switch ($type) {
        case 'aorb':
            $request = new SubmitAorbAnswerRequestDto();
            $request->choices = $req->get("choices");
            break;
        default:
            throw new BadRequestHttpException("Received unknown answer type: $type");
    }
    return $request;
}

interface SubmitAnswerRequestDto
{
}

class SubmitAorbAnswerRequestDto
{
    /** @var string[] an array containing 'a' and 'b' characters */
    public array $choices;
}