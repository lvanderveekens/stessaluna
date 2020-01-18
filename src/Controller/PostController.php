<?php

namespace App\Controller;

use App\Dto\PostDto;
use App\Entity\Post;
use App\Service\FileUploader;
use DateTime;
use ErrorException;
use Exception;
use Psr\Log\LoggerInterface;
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
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * @Route("/", methods={"GET"})
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
     * @Route("/", methods={"POST"})
     */
    public function createPost(Request $request, FileUploader $fileUploader): Response
    {
        $user = $this->getUser();

        $post = new Post();
        $post->setUser($user);
        $post->setText($request->request->get('text'));
        $post->setCreatedAt(new DateTime('now'));

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
        $entityManager = $this->getDoctrine()->getManager();
        // TODO: what if $id does not exist? return 404
        $post = $entityManager->getRepository(Post::class)->find($id);

        if ($post->getImageFilename()) {
            try {
                $imagesDir = $this->getParameter('images_directory');
                unlink($imagesDir . '/' . $post->getImageFilename());
            } catch (Exception $e) {
                $this->logger->error($e);
            }
        }

        $entityManager->remove($post);
        $entityManager->flush();

        return new Response('Deleted post with id ' . $id);
    }

    private static function convertToDto(Post $post): PostDto
    {
        $dto = new PostDto();
        $dto->setId($post->getId());
        $dto->setText($post->getText());
        $dto->setUserName($post->getUser()->getFirstName() . ' ' . $post->getUser()->getLastName());
        $dto->setCreatedAt($post->getCreatedAt());

        if ($post->getUser()->getAvatarFilename()) {
            // TODO: move base upload path to a common place
            $dto->setAvatarPath('/uploads/avatars/' .  $post->getUser()->getAvatarFilename());
        }

        if ($post->getImageFilename()) {
            // TODO: move base upload path to a common place
            $dto->setImagePath('/uploads/images/' .  $post->getImageFilename());
        }
        return $dto;
    }
}