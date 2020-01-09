<?php

namespace App\Controller;

use App\Dto\PostDto;
use App\Entity\Post;
use DateTime;
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
    public function createPost(Request $request, LoggerInterface $logger): Response
    {
        $post = new Post();
        $post->setUserName($request->request->get('userName'));
        $post->setText($request->request->get('text'));
        $post->setCreatedAt(new DateTime('now'));

        $uploadedImage = $request->files->get('image');

        if ($uploadedImage) {
            // TODO: move to file upload service -> https://symfony.com/doc/current/controller/upload_file.html
            //https://symfonycasts.com/screencast/symfony-uploads/public-path#play
            $originalFilename = pathinfo($uploadedImage->getClientOriginalName(), PATHINFO_FILENAME);
            // this is needed to safely include the file name as part of the URL
            $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $uploadedImage->guessExtension();

            $uploadedImage->move(
                $this->getParameter('images_directory'),
                $newFilename
            );
            $post->setImageFilename($newFilename);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($post);
        $entityManager->flush();

        return new Response('Saved new post with id ' . $post->getId());
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
            $imagesDir = $this->getParameter('images_directory');
            unlink($imagesDir . '/' . $post->getImageFilename());
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
        $dto->setUserName($post->getUserName());
        $dto->setCreatedAt($post->getCreatedAt());

        if ($post->getImageFilename()) {
            // TODO: move base upload path to a common place
            $dto->setImagePath('/uploads/images/' .  $post->getImageFilename());
        }
        return $dto;
    }
}