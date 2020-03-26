<?php

namespace Stessaluna\Api\Exercise\Aorb\Dto;

class AorbSentenceDto
{

    private $textBefore;

    private $choice;

    private $textAfter;

    public function __construct(string $textBefore, AorbChoiceDto $choice, string $textAfter)
    {
        $this->textBefore = $textBefore;
        $this->choice = $choice;
        $this->textAfter = $textAfter;
    }

    public function getTextBefore(): string 
    {
        return $this->textBefore;
    }

    public function getChoice(): AorbChoiceDto
    {
        return $this->choice;
    }

    public function getTextAfter(): string 
    {
        return $this->textAfter;
    }
}
