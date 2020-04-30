<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Symfony\Component\HttpFoundation\Request;

class RequestToCreatePostRequestConverter
{
    public static function convert(Request $request): CreatePostRequest
    {

        $createPostRequest = array(
            'text'     => $request->get('text'),
            'image'    => $request->files->get('image'),
            'exercise' => $request->get('exercise')
        );
        return $createPostRequest
    }
}