<?php

declare(strict_types=1);

namespace Stessaluna\Post;

use DateTime;
use Psr\Log\LoggerInterface;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Image\ImageService;
use Stessaluna\Image\Repository\ImageRepository;
use Stessaluna\Post\Entity\Post;
use Stessaluna\Post\Exception\NotPostAuthorException;
use Stessaluna\Post\Exception\PostNotFoundException;
use Stessaluna\Post\Repository\PostRepository;
use Stessaluna\User\Entity\User;

class PostService
{
    /**
     * @var LoggerInterface
     */
    private $logger;
    /**
     * @var PostRepository
     */
    private $postRepository;
    /**
     * @var ImageService
     */
    private $imageService;
    /**
     * @var ImageRepository
     */
    private $imageRepository;

    public function __construct(LoggerInterface $logger, PostRepository $postRepository, ImageService $imageService,
                                ImageRepository $imageRepository)
    {
        $this->logger = $logger;
        $this->postRepository = $postRepository;
        $this->imageService = $imageService;
        $this->imageRepository = $imageRepository;
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

    public function createPost(string $channel, ?string $text, ?int $imageId, ?Exercise $exercise, User $user): Post
    {
        $post = new Post();
        $post->setAuthor($user);
        $post->setCreatedAt(new DateTime('now'));
        $post->setChannel($channel);
        $post->setText($text);
        $post->setImage($imageId ? $this->imageRepository->getReference($imageId) : null);
        $post->setExercise($exercise);
        return $this->postRepository->save($post);
    }

    public function updatePost(int $id, string $channel, ?string $text, ?int $imageId, ?Exercise $exercise, User $user): Post
    {
        $post = $this->postRepository->find($id);
        if (!$post) {
            throw new PostNotFoundException($id);
        }
        if ($user->getId() != $post->getAuthor()->getId()) {
            throw new NotPostAuthorException($id);
        }
        $post->setChannel($channel);
        $post->setText($text);
        $post->setImage($imageId ? $this->imageRepository->getReference($imageId) : null);

        if ($post->getExercise() == null || !$post->getExercise()->equals($exercise)) {
            // updating an exercise invalidates all answers
            $post->setExercise($exercise);
        }
        return $this->postRepository->save($post);
    }

    public function deletePostById(int $id, User $user)
    {
        $post = $this->postRepository->find($id);
        if (!$post) {
            throw new PostNotFoundException($id);
        }
        if ($user->getId() != $post->getAuthor()->getId()) {
            throw new NotPostAuthorException($id);
        }

        if ($post->getImage()) {
            $this->imageService->delete($post->getImage());
        }

        $exercise = $post->getExercise();
        if ($exercise) {
            if ($exercise instanceof WhatdoyouseeExercise) {
                // delete image by hand and let doctrine automagically cascade delete the exercise
                $this->imageService->delete($exercise->getImage());
            }
        }
        $this->postRepository->delete($post);
    }
}