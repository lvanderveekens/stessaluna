<?php

namespace App\Controller;

use App\Dto\PostDto;
use App\Entity\Post;
use App\Service\CommentConverter;
use App\Service\FileUploader;
use App\Service\UserConverter;
use DateTime;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/posts")
 */
class PostController extends AbstractController
{
    private $logger;
    private $commentConverter;

    public function __construct(LoggerInterface $logger, UserConverter $userConverter, CommentConverter $commentConverter)
    {
        $this->logger = $logger;
        $this->userConverter = $userConverter;
        $this->commentConverter = $commentConverter;
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
            return $this->convertToDto($post);
        }, $posts));
    }

    /**
     * @Route(methods={"POST"})
     */
    public function createPost(Request $request, FileUploader $fileUploader): JsonResponse
    {
        $user = $this->getUser();

        $post = new Post();
        $post->setUser($user);
        $post->setCreatedAt(new DateTime('now'));

        $text = $request->request->get('text');
        if (!empty($text)) {
            $post->setText($text);
        }

        $postImage = $request->files->get('image');
        if ($postImage) {
            $imageFilename = $fileUploader->upload($postImage, $this->getParameter('images_directory'));
            $post->setImageFilename($imageFilename);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($post);
        $entityManager->flush();

        return $this->json($this->convertToDto($post));
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
            throw new AccessDeniedHttpException("Only the owner can delete this post");
        }

        if ($post->getImageFilename()) {
            try {
                $imagesDir = $this->getParameter('images_directory');
                unlink($imagesDir . '/' . $post->getImageFilename());
            } catch (Exception $e) {
                $this->logger->error($e);
            }
        }

        $em->remove($post);
        $em->flush();

        return new Response('Deleted post with id ' . $id);
    }

    private function convertToDto(Post $post): PostDto
    {
        $userDto = $this->userConverter->toDto($post->getUser());

        $dto = new PostDto();
        $dto->setId($post->getId());
        $dto->setText($post->getText());
        $dto->setUser($userDto);
        $dto->setCreatedAt($post->getCreatedAt());

        $comments = array_map(function ($comment) {
            return $this->commentConverter->toDto($comment);
        }, $post->getComments()->toArray());

        $dto->setComments($comments);
        $dto->setAvatar($userDto->getAvatar());

        if ($post->getImageFilename()) {
            // TODO: move base upload path to a common place
            $dto->setImage('/uploads/images/' .  $post->getImageFilename());
        }
        return $dto;
    }
}