<?php

declare(strict_types=1);

namespace Stessaluna\Post\Exception;

use Stessaluna\Exception\NotFoundException;

class PostNotFoundException extends NotFoundException
{
    public function __construct(int $id)
    {
        parent::__construct('Post not found: '.$id);
    }
}