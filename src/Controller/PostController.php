<?php

namespace App\Controller;

use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/posts")
 */
class PostController extends AbstractController
{
    /**
     * @Route("/", methods={"GET"})
     */
    public function getPosts(SerializerInterface $serializer): JsonResponse
    {
        $posts = $this->getDoctrine()
            ->getRepository(Post::class)
            ->findAll();

        $json = $serializer->serialize($posts, 'json');
        return JsonResponse::fromJsonString($json);
    }

    /**
     * @Route("/", methods={"POST"})
     */
    public function createPost(): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $post = new Post();
        $post->setText("testje");

        $entityManager->persist($post);
        $entityManager->flush();

        return new Response('Saved new post with id ' . $post->getId());
    }
}