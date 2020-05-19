<?php

declare(strict_types=1);

namespace Stessaluna\Post\Controller;

use Psr\Log\LoggerInterface;
use Stessaluna\Post\Dto\CreatePostToPostConverter;
use Stessaluna\Post\Dto\PostToPostDtoConverter;
use Stessaluna\Post\Dto\RequestToCreatePostConverter;
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
    private CreatePostToPostConverter $createPostToPostConverter;
    private PostToPostDtoConverter $postToPostDtoConverter;
    private PostService $postService;
    private LoggerInterface $logger;

    public function __construct(
        CreatePostToPostConverter $createPostToPostConverter,
        PostToPostDtoConverter $postToPostDtoConverter,
        PostService $postService,
        LoggerInterface $logger
    )
    {
        $this->createPostToPostConverter = $createPostToPostConverter;
        $this->postToPostDtoConverter = $postToPostDtoConverter;
        $this->postService = $postService;
        $this->logger = $logger;
    }

    /**
     * @Route(methods={"GET"})
     */
    public function getPosts(Request $request): JsonResponse
    {
        $posts = $this->postService->getPosts(
            (int)$request->query->get('beforeId'),
            (int)$request->query->get('limit')
        );

        return $this->json(array_map(function ($post) {
            return $this->postToPostDtoConverter->convert($post, $this->getUser());
        }, $posts));
    }

    /**
     * @Route(methods={"POST"})
     */
    public function createPost(Request $request): JsonResponse
    {
        $createPost = RequestToCreatePostConverter::convert($request);

        $post = $this->createPostToPostConverter->convert($createPost, $this->getUser());
        $createdPost = $this->postService->createPost($post);

        return $this->json($this->postToPostDtoConverter->convert($createdPost, $this->getUser()));
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function deletePostById(int $id): Response
    {
        $this->postService->deletePostById($id, $this->getUser());
        return new Response();
    }
}