<?php 

namespace Stessaluna\Api\Exercise\Aorb\Dto;

class AorbChoiceDto
{
    private $a;

    private $b;

    public function __construct(string $a, string $b)
    {
        $this->a = $a;
        $this->b = $b;
    }

    public function getA(): string
    {
        return $this->a;
    }

    public function getB(): string
    {
        return $this->b;
    }
}