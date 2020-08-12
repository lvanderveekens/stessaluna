<?php


namespace Stessaluna\Comment\Dto;


class AddCommentRequest
{
    /** @var int */
    public $postId;

    /** @var string */
    public $text;
}