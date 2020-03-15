<?php

namespace Stessaluna\Api\Post\Aorb\Dto;

use Stessaluna\Api\Post\Dto\PostDto;

class AorbPostDto extends PostDto {

    private $sentences;

    public function __construct()
    {
        parent::__construct('aorb');
    }

    /**
     * @param AorbSentenceDto[] $sentences
     */
    public function setSentences(array $sentences)
    {
        $this->sentences = $sentences;
    }

    /**
     * @return AorbSentenceDto[]
     */
    public function getSentences(): array
    {
        return $this->sentences;
    }
}