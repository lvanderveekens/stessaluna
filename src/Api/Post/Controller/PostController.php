<?php

declare(strict_types=1);

namespace Stessaluna\Api\Post\Controller;

use DateTime;
use Stessaluna\Api\Post\Dto\PostDtoConverter;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbChoice;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Domain\Image\ImageStorage;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/posts")
 */
class PostController extends AbstractController
{
    private PostDtoConverter $postDtoConverter;
    private ImageStorage $imageStorage;
    private PostRepository $postRepository;

    public function __construct(
        PostDtoConverter $postDtoConverter,
        ImageStorage $imageStorage,
        PostRepository $postRepository
    ) {
        $this->postDtoConverter = $postDtoConverter;
        $this->imageStorage = $imageStorage;
        $this->postRepository = $postRepository;
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
            return $this->postDtoConverter->toDto($post, $this->getUser());
        }, $posts));
    }

    /**
     * @Route(methods={"POST"})
     */
    public function createPost(Request $request): JsonResponse
    {
        $text = $request->get('text');
        $image = $request->files->get('image');
        $exerciseJsonString = $request->get('exercise');

        $post = new Post();
        $post->setAuthor($this->getUser());
        $post->setCreatedAt(new DateTime('now'));
        $post->setText($text);
        if ($image) {
            $filename = $this->imageStorage->store($image);
            $post->setImageFilename($filename);
        }

        if ($exerciseJsonString) {
            $exerciseJson = json_decode($exerciseJsonString, true);

            $exercise = null;
            if ($exerciseJson['type'] === 'aorb') {
                $exercise = $this->createAorbExercise($exerciseJson['sentences']);
            }

            $post->setExercise($exercise);
        }

        $post = $this->postRepository->save($post);
        return $this->json($this->postDtoConverter->toDto($post, $this->getUser()));
    }

    public function createAorbExercise(array $sentences): AorbExercise
    {
        $exercise = new AorbExercise();
        foreach ($sentences as $s) {
            $sentence = new AorbSentence();
            $sentence->setTextBefore($s['textBefore']);

            $choice = new AorbChoice();
            $choice->setA($s['choice']['a']);
            $choice->setB($s['choice']['b']);
            $choice->setCorrect($s['choice']['correct']);
            $sentence->setChoice($choice);

            $sentence->setTextAfter($s['textAfter']);

            $exercise->addSentence($sentence);
        }
        return $exercise;
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

        if ($this->getUser()->getId() != $post->getAuthor()->getId()) {
            throw new AccessDeniedHttpException('Only the author can delete this post');
        }

        if ($post->getImageFilename()) {
            $this->imageStorage->delete($post->getImageFilename());
        }

        $em->remove($post);
        $em->flush();

        return new Response('Deleted post with id '.$id);
    }
}