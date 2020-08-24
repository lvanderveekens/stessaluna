<?php

declare(strict_types=1);

namespace Stessaluna\Post;

use DateTime;
use Psr\Log\LoggerInterface;
use Stessaluna\Exception\NotAuthorException;
use Stessaluna\Exception\ResourceNotFoundException;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\ExerciseService;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Image\Repository\ImageRepository;
use Stessaluna\Image\Storage\ImageStorage;
use Stessaluna\Post\Entity\Post;
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
     * @var ImageStorage
     */
    private $imageStorage;
    /**
     * @var ImageRepository
     */
    private $imageRepository;
    /**
     * @var ExerciseService
     */
    private $exerciseService;

    public function __construct(
        LoggerInterface $logger,
        PostRepository $postRepository,
        ImageStorage $imageStorage,
        ImageRepository $imageRepository,
        ExerciseService $exerciseService
    )
    {
        $this->logger = $logger;
        $this->postRepository = $postRepository;
        $this->imageStorage = $imageStorage;
        $this->imageRepository = $imageRepository;
        $this->exerciseService = $exerciseService;
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

    public function findPost(int $id): ?Post
    {
        return $this->postRepository->find($id);
    }

    public function getPost(int $id): Post
    {
        $post = $this->postRepository->find($id);
        if (!$post) {
            throw new ResourceNotFoundException('Post not found for id: ' . $id);
        }
        return $post;
    }

    public function createPost(string $channel, ?string $text, ?int $imageId, ?Exercise $exercise, User $user): Post
    {
        $post = new Post();
        $post->setAuthor($user);
        $now = new DateTime('now');
        $post->setCreatedAt($now);
        $post->setModifiedAt($now);
        $post->setChannel($channel);
        $post->setText($text);
        $post->setImage($imageId ? $this->imageRepository->getReference($imageId) : null);
        $post->setExercise($exercise);
        return $this->postRepository->save($post);
    }

    public function updatePost(int $id, string $channel, ?string $text, ?int $imageId, ?Exercise $exercise, User $user): Post
    {
        $post = $this->getPost($id);
        if ($user->getId() != $post->getAuthor()->getId()) {
            throw new NotAuthorException('Not author of post: ' . $id);
        }
        $post->setChannel($channel);
        $post->setText($text);
        $post->setImage($imageId ? $this->imageRepository->getReference($imageId) : null);
        $post->setExercise($this->exerciseService->updateExercise($post->getExercise(), $exercise));
        $post->setModifiedAt(new DateTime('now'));
        return $this->postRepository->save($post);
    }

    public function deletePostById(int $id, User $user)
    {
        $post = $this->getPost($id);
        if ($user->getId() != $post->getAuthor()->getId()) {
            throw new NotAuthorException('Not author of post: ' . $id);
        }

        if ($post->getImage()) {
            // doctrine already removes the image from database so only remove it from storage
            $this->imageStorage->delete($post->getImage()->getFilename());
        }

        $exercise = $post->getExercise();
        if ($exercise) {
            if ($exercise instanceof WhatdoyouseeExercise) {
                // doctrine already removes the image from database so only remove it from storage
                $this->imageStorage->delete($exercise->getImage()->getFilename());
            }
        }
        $this->postRepository->delete($post);
    }
}