<?php

declare(strict_types=1);

namespace Stessaluna\Exception;

use Exception;

class ResourceNotFoundException extends Exception
{
    public function __construct(string $message)
    {
        parent::__construct($message);
    }
}