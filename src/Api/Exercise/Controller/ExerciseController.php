<?php

namespace Stessaluna\Api\Exercise\Controller;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Dto\ExerciseDtoConverter;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Exercise\Entity\Exercise;
use Stessaluna\Domain\Exercise\Repository\ExerciseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
        // $request = toSubmitAnswerRequest($req);

        $exercise = $this->exerciseRepository->findById($id);
        if ($exercise instanceof AorbExercise) {
            // return $this->json($exercise->getSentences());
        }

        return $this->json($this->exerciseDtoConverter->toDto($exercise));
    }
}

function toSubmitAnswerRequest(Request $req): SubmitAnswerRequest
{
    $request = new SubmitAnswerRequest();
    // $request->banaan = $req->get('banaan');
    return $request;
}

class SubmitAnswerRequest
{
    public int $type;
}