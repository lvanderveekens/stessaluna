<?php

declare(strict_types=1);

namespace Stessaluna\Vote\Dto;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @Assert\Expression(
 *     "(this.postId != null or this.commentId != null) and (this.postId == null or this.commentId == null)",
 *     message="Must either provide a 'postId' or 'commentId' field"
 * )
 */
class AddVoteRequest
{
    /**
     * @Assert\NotNull(
     *     message="Missing required field: 'type'"
     * )
     * @Assert\Choice(
     *     choices={"UP", "DOWN"},
     *     message="Field 'type' only supports 'UP' or 'DOWN'"
     * )
     *
     * @var string
     */
    public $type;

    /**
     * @var int|null
     */
    public $postId = null;

    /**
     * @var int|null
     */
    public $commentId = null;
}