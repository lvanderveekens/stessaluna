<?php

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Dto;

interface SubmitAnswerRequestDto
{
}

class SubmitAorbAnswerRequestDto implements SubmitAnswerRequestDto
{
    /** @var string[] an array containing 'a' and 'b' characters */
    public array $choices;
}