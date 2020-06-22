<?php

namespace Stessaluna\Exercise\Aorb\Dto;

class AorbSentenceDto
{

    /** @var string|null */
    public $textBefore = null;

    /** @var AorbChoiceDto */
    public $choice;

    /** @var string|null */
    public $textAfter = null;
}
