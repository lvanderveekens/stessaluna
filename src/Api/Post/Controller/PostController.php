<?php

declare(strict_types=1);

namespace Stessaluna\Api\Post\Controller;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Post\Dto\PostToDtoConverter;
use Stessaluna\Domain\Image\ImageStorage;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Exercise\Entity\ExercisePost;
use Stessaluna\Domain\Post\Service\PostCreator;
use Stessaluna\Domain\Post\Text\Entity\TextPost;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/posts")
 */
class PostController extends AbstractController
{
    private PostCreator $postCreator;
    private PostToDtoConverter $postToDtoConverter;
    private LoggerInterface $logger;
    private ImageStorage $imageStorage;

    public function __construct(
        PostCreator $postCreator,
        PostToDtoConverter $postToDtoConverter,
        LoggerInterface $logger,
        ImageStorage $imageStorage
    ) {
        $this->postCreator = $postCreator;
        $this->postToDtoConverter = $postToDtoConverter;
        $this->logger = $logger;
        $this->imageStorage = $imageStorage;
    }

    /**
     * @Route(methods={"GET"})
     */
    public function getPosts(): JsonResponse
    {
        $posts = $this->getDoctrine()
            ->getRepository(Post::class)
            ->findAll();

        return $this->json(array_map(function ($post) {
            return $this->postToDtoConverter->toDto($post, $this->getUser());
        }, $posts));
    }

    /**
     * @Route(methods={"POST"})
     */
    public function createPost(Request $request): JsonResponse
    {
        // TODO: parse request object instead of separate parameters?
        $type = $request->get('type');
        switch ($type) {
            case 'text':
                $post = $this->createTextPost($request);
                break;
            case 'exercise':
                $post = $this->createExercisePost($request);
                break;
            default:
                throw new BadRequestHttpException("Received unknown post type: $type");
        }
        return $this->json($this->postToDtoConverter->toDto($post, $this->getUser()));
    }

    private function createTextPost(Request $request): TextPost
    {
        return $this->postCreator->createTextPost(
            $request->get('text'),
            $request->files->get('image'),
            $this->getUser()
        );
    }

    private function createExercisePost(Request $request): ExercisePost {
        $exercise = $request->get('exercise');
        $type = $exercise['type'];
        switch ($type) {
            case 'aorb':
                $post = $this->postCreator->createAorbExercisePost($exercise['sentences'], $this->getUser());
                break;
            default:
                throw new BadRequestHttpException("Received unknown post type: $type");
        }
        return $post;
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function deletePostById(int $id)
    {
        // TODO: use post interface
        // move this to domain?
        $em = $this->getDoctrine()->getManager();
        $post = $em->getRepository(Post::class)->find($id);
        if (!$post) {
            return new NotFoundHttpException();
        }

        if ($this->getUser()->getId() != $post->getUser()->getId()) {
            throw new AccessDeniedHttpException("Only the author can delete this post");
        }

        if ($post->getImageFilename()) {
            $this->imageStorage->delete($post->getImageFilename());
        }

        $em->remove($post);
        $em->flush();

        return new Response('Deleted post with id ' . $id);
    }
}