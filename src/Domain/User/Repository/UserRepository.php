<?php

declare(strict_types=1);

namespace Stessaluna\Domain\User\Repository;

use Stessaluna\Domain\User\Entity\User;

interface UserRepository
{
    function save(User $user): User;
}