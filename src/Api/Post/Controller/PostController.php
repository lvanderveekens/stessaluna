<?php

namespace Stessaluna\Api\Post\Controller;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Post\Dto\PostDtoConverter;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Service\PostCreator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/posts")
 */
class PostController extends AbstractController
{
    private LoggerInterface $logger;

    private PostCreator $postCreator;

    private PostDtoConverter $postDtoConverter;

    public function __construct(PostCreator $postCreator, PostDtoConverter $postDtoConverter, LoggerInterface $logger)
    {
        $this->postCreator = $postCreator;
        $this->postDtoConverter = $postDtoConverter;
        $this->logger = $logger;
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
            $aap = $this->postDtoConverter->toDto($post, $this->getUser());
            $this->logger->warning(print_r($aap,true));
            return $this->postDtoConverter->toDto($post, $this->getUser());
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
            case 'aorb':
                $post = $this->postCreator->createAorbPost($request->get('sentences'), $this->getUser());
                break;
            default:
                throw new BadRequestHttpException("Received unknown post type: $type");
        }
        return $this->json($this->postDtoConverter->toDto($post));
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function deletePostById(int $id)
    {
        $em = $this->getDoctrine()->getManager();
        // TODO: what if $id does not exist? return 404
        $post = $em->getRepository(Post::class)->find($id);

        if ($this->getUser()->getId() != $post->getUser()->getId()) {
            throw new AccessDeniedHttpException("Only the author can delete this post");
        }

        // TODO: reenable when fixing text posts
        // if ($post->getImageFilename()) {
        //     try {
        //         $imagesDir = $this->getParameter('images_directory');
        //         unlink($imagesDir . '/' . $post->getImageFilename());
        //     } catch (Exception $e) {
        //         $this->logger->error($e);
        //     }
        // }

        $em->remove($post);
        $em->flush();

        return new Response('Deleted post with id ' . $id);
    }
}