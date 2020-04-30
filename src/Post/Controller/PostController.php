<?php

declare(strict_types=1);

namespace Stessaluna\Post\Controller;

use Stessaluna\Post\Dto\CreatePostRequestToPostConverter;
use Stessaluna\Post\Dto\PostToPostDtoConverter;
use Stessaluna\Post\Dto\RequestToCreatePostRequestConverter;
use Stessaluna\Post\Service\PostService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/posts")
 */
class PostController extends AbstractController
{
    private CreatePostRequestToPostConverter $createPostRequestToPostConverter;
    private PostToPostDtoConverter $postToPostDtoConverter;
    private PostService $postService;

    public function __construct(
        CreatePostRequestToPostConverter $createPostRequestToPostConverter,
        PostToPostDtoConverter $postToPostDtoConverter,
        PostService $postService
    ) {
        $this->createPostRequestToPostConverter = $createPostRequestToPostConverter;
        $this->postToPostDtoConverter = $postToPostDtoConverter;
        $this->postService = $postService;
    }

    /**
     * @Route(methods={"GET"})
     */
    public function getPosts(): JsonResponse
    {
        $posts = $this->postService->getPosts();

        return $this->json(array_map(function ($post) {
            return $this->postToPostDtoConverter->convert($post, $this->getUser());
        }, $posts));
    }

    /**
     * @Route(methods={"POST"})
     */
    public function createPost(Request $request): JsonResponse
    {
        $request = RequestToCreatePostRequestConverter::convert($request);

        $post = $this->createPostRequestToPostConverter->convert($request, $this->getUser());
        $createdPost = $this->postService->createPost($post);

        return $this->json($this->postToPostDtoConverter->convert($createdPost, $this->getUser()));
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function deletePostById(int $id)
    {
        $this->postService->deletePostById($id, $this->getUser());

        return new Response('Deleted post with id '.$id);
    }
}