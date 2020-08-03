<?php


namespace Stessaluna\Post\Comment\Dto;


class AddCommentRequest
{
    /** @var int */
    public $postId;

    /** @var string */
    public $text;
}