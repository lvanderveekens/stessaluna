<?php

declare(strict_types=1);

namespace Stessaluna\Post\Controller;

use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Stessaluna\AbstractController;
use Stessaluna\Comment\Dto\CommentToCommentDtoMapper;
use Stessaluna\Exercise\Dto\ExerciseDtoToExerciseMapper;
use Stessaluna\Post\Dto\CreatePostRequest;
use Stessaluna\Post\Dto\PostToPostDtoMapper;
use Stessaluna\Post\Dto\UpdatePostRequest;
use Stessaluna\Post\Entity\Post;
use Stessaluna\Post\PostService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
     * @var PostToPostDtoMapper
     */
    private $postToPostDtoMapper;
    /**
     * @var PostService
     */
    private $postService;
    /**
     * @var ExerciseDtoToExerciseMapper
     */
    private $exerciseDtoToExerciseMapper;
    /**
     * @var CommentToCommentDtoMapper
     */
    private $commentToCommentDtoMapper;
    /**
     * @var SerializerInterface
     */
    private $serializer;
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(
        PostToPostDtoMapper $postToPostDtoMapper,
        PostService $postService,
        ExerciseDtoToExerciseMapper $exerciseDtoToExerciseMapper,
        CommentToCommentDtoMapper $commentToCommentDtoMapper,
        SerializerInterface $serializer,
        LoggerInterface $logger
    )
    {
        $this->postToPostDtoMapper = $postToPostDtoMapper;
        $this->postService = $postService;
        $this->exerciseDtoToExerciseMapper = $exerciseDtoToExerciseMapper;
        $this->commentToCommentDtoMapper = $commentToCommentDtoMapper;
        $this->serializer = $serializer;
        $this->logger = $logger;
    }

    /**
     * @Route(methods={"GET"})
     */
    public function getPosts(Request $request): JsonResponse
    {
        $posts = $this->postService->getPosts(
            (array)$request->query->get('channels'),
            (int)$request->query->get('beforeId'),
            (int)$request->query->get('limit')
        );
        return $this->json(array_map(function (Post $post) {
            return $this->postToPostDtoMapper->map($post, $this->getUser());
        }, $posts));
    }

    /**
     * @Route(methods={"POST"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function createPost(Request $request): JsonResponse
    {
        /** @var $createPostRequest CreatePostRequest */
        $createPostRequest = $this->deserializeJson($request, CreatePostRequest::class);
        $createdPost = $this->postService->createPost(
            $createPostRequest->channel,
            $createPostRequest->text,
            $createPostRequest->image ? $createPostRequest->image->id : null,
            $this->exerciseDtoToExerciseMapper->map($createPostRequest->exercise),
            $this->getUser()
        );
        return $this->json($this->postToPostDtoMapper->map($createdPost, $this->getUser()));
    }

    /**
     * @Route("/{id}", methods={"PUT"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function updatePost(Request $request, int $id): JsonResponse
    {
        /** @var $updatePostRequest UpdatePostRequest */
        $updatePostRequest = $this->deserializeJson($request, UpdatePostRequest::class);

        $updatedPost = $this->postService->updatePost(
            $id,
            $updatePostRequest->channel,
            $updatePostRequest->text,
            $updatePostRequest->image ? $updatePostRequest->image->id : null,
            $this->exerciseDtoToExerciseMapper->map($updatePostRequest->exercise),
            $this->getUser()
        );

        return $this->json($this->postToPostDtoMapper->map($updatedPost, $this->getUser()));
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function deletePostById(int $id): JsonResponse
    {
        $this->postService->deletePostById($id, $this->getUser());
        return new JsonResponse();
    }
}