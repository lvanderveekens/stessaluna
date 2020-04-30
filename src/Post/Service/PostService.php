<?php

declare(strict_types=1);

namespace Stessaluna\Post\Service;

use Stessaluna\Exception\NotAuthorException;
use Stessaluna\Exception\NotFoundException;
use Stessaluna\Post\Entity\Post;
use Stessaluna\Post\Repository\PostRepository;
use Stessaluna\User\Entity\User;

class PostService
{
    private PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * @return Post[] an array containing all posts
     */
    public function getPosts(): array
    {
        return $this->postRepository->findAll();
    }

    public function createPost(Post $post): Post
    {
        return $this->postRepository->save($post);
    }

    public function deletePostById(int $id, User $user)
    {
        $post = $this->postRepository->find($id);
        if (!$post) {
            return new NotFoundException('Post not found: '.$id);
        }

        if ($user->getId() != $post->getAuthor()->getId()) {
            return new NotAuthorException('Not the author of post: '.$id);
        }

        if ($post->getImageFilename()) {
            $this->imageStorage->delete($post->getImageFilename());
        }

        $this->postRepository->delete($post);
    }
}