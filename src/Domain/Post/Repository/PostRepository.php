<?php

declare(strict_types=1);

namespace Stessaluna\Domain\Post\Repository;

use Stessaluna\Domain\Post\Entity\Post;

interface PostRepository
{
    function save(Post $post): Post;
}