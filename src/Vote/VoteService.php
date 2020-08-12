<?php

declare(strict_types=1);

namespace Stessaluna\Vote;

use Stessaluna\User\Entity\User;
use Stessaluna\Vote\Entity\Vote;

class VoteService
{

    public function __construct()
    {
    }

    public function addVote(string $type, ?int $postId, ?int $commentId, User $user): Vote
    {


    }
}