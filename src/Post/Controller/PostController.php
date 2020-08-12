<?php

declare(strict_types=1);

namespace Stessaluna\Post\Controller;

use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Stessaluna\AbstractController;
use Stessaluna\Exercise\Dto\ExerciseDtoToExerciseConverter;
use Stessaluna\Post\Comment\Dto\CommentToCommentDtoConverter;
use Stessaluna\Post\Dto\CreatePostRequest;
use Stessaluna\Post\Dto\PostToPostDtoConverter;
use Stessaluna\Post\Dto\UpdatePostRequest;
use Stessaluna\Post\Entity\Post;
use Stessaluna\Post\PostService;
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
     * @var ExerciseDtoToExerciseConverter
     */
    private $exerciseDtoToExerciseConverter;
    /**
     * @var CommentToCommentDtoConverter
     */
    private $commentToCommentDtoConverter;
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
        ExerciseDtoToExerciseConverter $exerciseDtoToExerciseConverter,
        CommentToCommentDtoConverter $commentToCommentDtoConverter,
        SerializerInterface $serializer,
        LoggerInterface $logger
    )
    {
        $this->postToPostDtoConverter = $postToPostDtoConverter;
        $this->postService = $postService;
        $this->exerciseDtoToExerciseConverter = $exerciseDtoToExerciseConverter;
        $this->commentToCommentDtoConverter = $commentToCommentDtoConverter;
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
        /** @var $createPostRequest CreatePostRequest */
        $createPostRequest = $this->serializer->deserialize($request->getContent(), CreatePostRequest::class, 'json');
        $createdPost = $this->postService->createPost(
            $createPostRequest->channel,
            $createPostRequest->text,
            $createPostRequest->image ? $createPostRequest->image->id : null,
            $this->exerciseDtoToExerciseConverter->convert($createPostRequest->exercise),
            $this->getUser()
        );
        return $this->json($this->postToPostDtoConverter->convert($createdPost, $this->getUser()));
    }

    /**
     * @Route("/{id}", methods={"PUT"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function updatePost(Request $request, int $id): JsonResponse
    {
        /** @var $updatePostRequest UpdatePostRequest */
        $updatePostRequest = $this->serializer->deserialize($request->getContent(), UpdatePostRequest::class, 'json');
        $updatedPost = $this->postService->updatePost(
            $id,
            $updatePostRequest->channel,
            $updatePostRequest->text,
            $updatePostRequest->image ? $updatePostRequest->image->id : null,
            $this->exerciseDtoToExerciseConverter->convert($updatePostRequest->exercise),
            $this->getUser()
        );
        return $this->json($this->postToPostDtoConverter->convert($updatedPost, $this->getUser()));
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