<?php

namespace Stessaluna\Api\Post\Dto;

use Stessaluna\Api\Post\Dto\PostDto;

class TextPostDto extends PostDto
{
    public string $text;
    public ?string $imagePath = null;

    public function __construct()
    {
        parent::__construct('text');
    }
}