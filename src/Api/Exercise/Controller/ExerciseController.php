<?php

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Controller;

use Exception;
use Psr\Log\LoggerInterface;
use stdClass;
use Stessaluna\Api\Exercise\Dto\ExerciseDtoConverter;
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
        // TODO: move logic to domain
        $request = toSubmitAnswerRequestDto($req);
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
        return $this->json($this->exerciseDtoConverter->toDto($exercise, $this->getUser()));
    }
}

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

class SubmitAorbAnswerRequestDto implements SubmitAnswerRequestDto
{
    /** @var string[] an array containing 'a' and 'b' characters */
    public array $choices;
}