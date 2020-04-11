<?php

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Dto;

use Stessaluna\Api\Exercise\Aorb\Dto\SubmitAorbAnswerRequestDto;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RequestDtoConverter
{
    public static function toSubmitAnswerRequestDto(Request $req): SubmitAnswerRequestDto
    {
        $type = $req->get('type');
        switch ($type) {
            case 'aorb':
                $request = new SubmitAorbAnswerRequestDto();
                $request->choices = $req->get('choices');
                break;
            default:
                throw new BadRequestHttpException("Received unknown answer type: $type");
        }
        return $request;
    }
}