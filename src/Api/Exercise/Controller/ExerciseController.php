<?php

namespace Stessaluna\Api\Exercise\Controller;

use Psr\Log\LoggerInterface;
use stdClass;
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
        // TODO: move validation logic to domain
        $exercise = $this->exerciseRepository->findById($id);
        if ($exercise instanceof AorbExercise) {
            $request = toAorbAnswerDto($req);

            $feedback = [];

            $sentences = $exercise->getSentences()->toArray();
            for ($i = 0; $i < count($sentences); $i++) {
                $correct = $sentences[$i]->getChoice()->getCorrect();
                $answer = $request->choices[$i];
                if ($correct === $answer) {
                    array_push($feedback, true);
                } else {
                    array_push($feedback, false);
                }
            }

            return $this->json(array('feedback' => $feedback));
        }

        return $this->json($this->exerciseDtoConverter->toDto($exercise));
    }
}

function toAorbAnswerDto(Request $req): AorbAnswerDto
{
    $request = new AorbAnswerDto();
    $request->choices = $req->get('choices');
    return $request;
}

class AorbAnswerDto
{
    /** @var string[] an array containing 'a' and 'b' characters */
    public array $choices;
}