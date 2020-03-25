<?php 

namespace Stessaluna\Api\Post\Aorb\Dto;

class AorbChoiceDto
{
    private $a;

    private $b;

    private $correct;

    public function __construct(string $a, string $b, string $correct)
    {
        $this->a = $a;
        $this->b = $b;
        $this->correct = $correct;
    }

    public function getA(): string
    {
        return $this->a;
    }

    public function getB(): string
    {
        return $this->b;
    }

    public function getCorrect(): string
    {
        return $this->correct;
    }
}