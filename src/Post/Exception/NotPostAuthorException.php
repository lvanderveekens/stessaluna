<?php

declare(strict_types=1);

namespace Stessaluna\Post\Exception;

use Stessaluna\Exception\NotAuthorException;
use Stessaluna\Exception\NotFoundException;

class NotPostAuthorException extends NotAuthorException
{
    public function __construct(int $id)
    {
        parent::__construct('Not the author of post: ' . $id);
    }
}