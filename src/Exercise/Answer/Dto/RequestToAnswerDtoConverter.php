<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Dto;

use Stessaluna\Exercise\Answer\Dto\AnswerDto;
use Stessaluna\Exercise\Answer\Dto\AorbAnswerDto;
use Stessaluna\Exercise\Answer\Dto\WhatdoyouseeAnswerDto;
use Stessaluna\Exercise\ExerciseType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RequestToAnswerDtoConverter
{
    public static function convert(Request $request): AnswerDto
    {
        $dto = null;
        $type = $request->get('type');
        switch ($type) {
            case ExerciseType::A_OR_B:
                $dto = new AorbAnswerDto();
                $dto->choices = $request->get('choices');
                break;
            case ExerciseType::WHAT_DO_YOU_SEE:
                $dto = new WhatdoyouseeAnswerDto();
                $dto->option = $request->get('option');
                break;
            default:
                throw new BadRequestHttpException("Received unknown answer type: $type");
        }
        return $dto;
    }
}