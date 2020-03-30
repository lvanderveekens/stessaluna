<?php

namespace Stessaluna\Api\Exercise\Controller;

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
    public function submitAnswer(int $id, Request $request): JsonResponse
    {
        $exercise = $this->exerciseRepository->findById($id);

        // TODO: move validation logic to domain
        // TODO: check if answer type matches exercise

        if ($exercise instanceof AorbExercise) {
            $type = $request->get('type');
            if ($type !== 'aorb') {
                throw new BadRequestHttpException("Received unknown answer type: $type");
            }

            $choices = $request->get('choices');

            $answer = new Answer();
            $answer->setUser($this->getUser());
            $answer->setChoices($choices);

            $exercise->addAnswer($answer);
            $this->exerciseRepository->save($exercise);

            // TODO: this is checking whether the feedback is correct... move this elsewhere
            // $feedback = [];
            // $sentences = $exercise->getSentences()->toArray();
            // for ($i = 0; $i < count($sentences); $i++) {
            //     $correct = $sentences[$i]->getChoice()->getCorrect();
            //     $answer = $answer->choices[$i];
            //     if ($correct === $answer) {
            //         array_push($feedback, true);
            //     } else {
            //         array_push($feedback, false);
            //     }
            // }

            return $this->json(array('status' => 'ok'));
        }
        return $this->json($this->exerciseDtoConverter->toDto($exercise));
    }
}

// function toAorbAnswer(Request $req): AorbAnswer
// {
//     $request = new AorbAnswer();
//     $request->choices = $req->get('choices');
//     return $request;
// }

// class SubmitAnswerDtoRequest
// {
//     public string $type;

// }

// class AorbAnswer
// {
//     /** @var string[] an array containing 'a' and 'b' characters */
//     public array $choices;
// }