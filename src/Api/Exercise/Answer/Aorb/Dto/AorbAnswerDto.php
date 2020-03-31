<?php 

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Answer\Aorb\Dto;

use Stessaluna\Api\Exercise\Answer\Dto\AnswerDto;

class AorbAnswerDto implements AnswerDto
{
    /** @var string[] an array containing 'a' and 'b' characters */
    public array $choices;
}