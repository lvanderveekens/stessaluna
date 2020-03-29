<?php

namespace Stessaluna\Api\Exercise\Controller;

use Psr\Log\LoggerInterface;
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

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * @Route("/{id}/answers", methods={"POST"})
     */
    public function submitAnswer(int $id, Request $req): JsonResponse
    {
        $request = toSubmitAnswerRequest($req);
        $this->logger->info(print_r($request, true));

        return $this->json($request);
    }
}

function toSubmitAnswerRequest(Request $req): SubmitAnswerRequest
{
    $request = new SubmitAnswerRequest();
    $request->banaan = $req->get('banaan');
    return $request;
}

class SubmitAnswerRequest
{
    public int $banaan;
}