<?php

declare(strict_types=1);

namespace Stessaluna\Post\Controller;

use DateTime;
use Stessaluna\Post\Dto\PostDtoConverter;
use Stessaluna\Exercise\Aorb\Entity\AorbChoice;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Image\ImageStorage;
use Stessaluna\Post\Entity\Post;
use Stessaluna\Post\Repository\PostRepository;
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
        $request = [
            'text' => $request->get('text'),
            'image' => $request->files->get('image'),
            'exercise' => $request->get('exercise')
        ];

        $post = new Post();
        $post->setAuthor($this->getUser());
        $post->setCreatedAt(new DateTime('now'));
        $post->setText($request['text']);

        if ($request['image']) {
            $filename = $this->imageStorage->store($request['image']);
            $post->setImageFilename($filename);
        }

        if ($request['exercise']) {
            $exercise = null;

            $type = $request['exercise']['type'];
            if ($type === 'aorb') {
                $exercise = $this->createAorbExercise($request['exercise']['sentences']);
            } elseif ($type === 'whatdoyousee') {
            }

            $post->setExercise($exercise);
        }

        $post = $this->postRepository->save($post);
        return $this->json($this->postDtoConverter->toDto($post, $this->getUser()));
    }

    public function createAorbExercise(array $requestSentences): AorbExercise
    {
        $exercise = new AorbExercise();

        $sentences = [];
        foreach ($requestSentences as $requestSentence) {
            $sentence = new AorbSentence();
            $sentence->textBefore = $requestSentence['textBefore'];

            $choice = new AorbChoice();
            $choice->a = $requestSentence['choice']['a'];
            $choice->b = $requestSentence['choice']['b'];
            $choice->correct = $requestSentence['choice']['correct'];
            $sentence->choice = $choice;

            $sentence->textAfter = $requestSentence['textAfter'];
            array_push($sentences, $sentence);
        }

        $exercise->setSentences($sentences);
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