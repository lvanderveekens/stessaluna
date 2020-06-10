<?php 

namespace Stessaluna\Exercise\Aorb\Dto;

class AorbChoiceDto
{
    /** @var string */
    public $a;

    /** @var string */
    public $b;

    /** @var string either 'a' or 'b' */
    public $correct = null;

    /** @var string either 'a' or 'b' */
    public $answer = null;
}