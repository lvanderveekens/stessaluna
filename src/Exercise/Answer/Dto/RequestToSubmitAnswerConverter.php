<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Dto;

use Stessaluna\Exercise\ExerciseType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RequestToSubmitAnswerConverter
{
    public static function convert(Request $request): SubmitAnswer
    {
        $dto = null;
        $type = $request->get('type');
        switch ($type) {
            case ExerciseType::A_OR_B:
                $dto = new SubmitAorbAnswer();
                $dto->choices = $request->get('choices');
                break;
            case ExerciseType::WHAT_DO_YOU_SEE:
                $dto = new SubmitWhatdoyouseeAnswer();
                $dto->option = $request->get('option');
                break;
            case ExerciseType::MISSING_WORD:
                $dto = new SubmitMissingwordAnswer();
                $dto->option = $request->get('option');
                break;
            default:
                throw new BadRequestHttpException("Received unknown answer type: $type");
        }
        return $dto;
    }
}