<?php

declare(strict_types=1);

namespace Stessaluna\Post\Service;

use Stessaluna\Exception\NotAuthorException;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Image\Storage\ImageStorage;
use Stessaluna\Post\Entity\Post;
use Stessaluna\Post\Exception\PostNotFoundException;
use Stessaluna\Post\Repository\PostRepository;
use Stessaluna\User\Entity\User;

class PostService
{
    /** @var PostRepository */
    private $postRepository;

    /** @var ImageStorage */
    private $imageStorage;

    public function __construct(PostRepository $postRepository, ImageStorage $imageStorage)
    {
        $this->postRepository = $postRepository;
        $this->imageStorage = $imageStorage;
    }

    /**
     * @param null|string[] $channels an array of channels (language codes) to filter by
     * @return Post[] an array containing all posts
     */
    public function getPosts(?array $channels, ?int $beforeId, ?int $limit): array
    {
        $posts = $this->postRepository->getPosts($channels, $beforeId, $limit);
        usort($posts, function (Post $a, Post $b) {
            return $a->getCreatedAt() < $b->getCreatedAt();
        });
        return $posts;
    }

    public function createPost(Post $post): Post
    {
        return $this->postRepository->save($post);
    }

    public function deletePostById(int $id, User $user)
    {
        $post = $this->postRepository->find($id);
        if (!$post) {
            throw new PostNotFoundException($id);
        }

        if ($user->getId() != $post->getAuthor()->getId()) {
            throw new NotAuthorException('Not the author of post: '.$id);
        }

        if ($post->getImageFilename()) {
            $this->imageStorage->delete($post->getImageFilename());
        }

        $exercise = $post->getExercise();
        if ($exercise) {
            if ($exercise instanceof WhatdoyouseeExercise) {
                // delete image by hand and let doctrine automagically cascade delete the exercise
                $this->imageStorage->delete($exercise->getImageFilename());
            }
        }
        $this->postRepository->delete($post);
    }
}