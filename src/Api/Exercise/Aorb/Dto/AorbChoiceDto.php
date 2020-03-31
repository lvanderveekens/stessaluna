<?php 

namespace Stessaluna\Api\Exercise\Aorb\Dto;

class AorbChoiceDto
{
    public string $a;

    public string $b;

    /** @var string either 'a' or 'b' */
    public ?string $correct = null;

    /** @var string either 'a' or 'b' */
    public ?string $answer = null;
}