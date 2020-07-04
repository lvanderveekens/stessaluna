<?php

declare(strict_types=1);

namespace Stessaluna\Post\Controller;

use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Stessaluna\Post\Dto\CreatePostRequest;
use Stessaluna\Post\Dto\CreatePostRequestToPostConverter;
use Stessaluna\Post\Dto\PostToPostDtoConverter;
use Stessaluna\Post\Entity\Post;
use Stessaluna\Post\PostService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/posts")
 *
 * @IsGranted("IS_AUTHENTICATED_ANONYMOUSLY")
 */
class PostController extends AbstractController
{
    /**
     * @var PostToPostDtoConverter
     */
    private $postToPostDtoConverter;
    /**
     * @var PostService
     */
    private $postService;
    /**
     * @var CreatePostRequestToPostConverter
     */
    private $createPostRequestToPostConverter;
    /**
     * @var SerializerInterface
     */
    private $serializer;
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(
        PostToPostDtoConverter $postToPostDtoConverter,
        PostService $postService,
        CreatePostRequestToPostConverter $createPostToPostConverter,
        SerializerInterface $serializer,
        LoggerInterface $logger
    )
    {
        $this->postToPostDtoConverter = $postToPostDtoConverter;
        $this->postService = $postService;
        $this->createPostRequestToPostConverter = $createPostToPostConverter;
        $this->serializer = $serializer;
        $this->logger = $logger;
    }

    /**
     * @Route(methods={"GET"})
     */
    public function getPosts(Request $request): JsonResponse
    {
        $posts = $this->postService->getPosts(
            $request->query->get('channels'),
            (int)$request->query->get('beforeId'),
            (int)$request->query->get('limit')
        );

        return $this->json(array_map(function (Post $post) {
            return $this->postToPostDtoConverter->convert($post, $this->getUser());
        }, $posts));
    }

    /**
     * @Route(methods={"POST"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function createPost(Request $request): JsonResponse
    {
        /* @var $createPostRequest CreatePostRequest */
        $createPostRequest = $this->serializer->deserialize($request->getContent(), CreatePostRequest::class, 'json');

        $post = $this->createPostRequestToPostConverter->convert($createPostRequest, $this->getUser());
        $createdPost = $this->postService->createPost($post);

        return $this->json($this->postToPostDtoConverter->convert($createdPost, $this->getUser()));
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function deletePostById(int $id): Response
    {
        $this->postService->deletePostById($id, $this->getUser());
        return new Response();
    }
}