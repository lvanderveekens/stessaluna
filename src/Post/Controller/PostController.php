<?php

declare(strict_types=1);

namespace Stessaluna\Post\Controller;

use DateTime;
use RuntimeException;
use Stessaluna\Exercise\Aorb\Entity\AorbChoice;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Exercise\Missingword\Entity\MissingwordExercise;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Image\ImageStorage;
use Stessaluna\Post\Dto\PostToPostDtoConverter;
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
    private PostToPostDtoConverter $postToPostDtoConverter;
    private ImageStorage $imageStorage;
    private PostRepository $postRepository;

    public function __construct(
        PostToPostDtoConverter $postToPostDtoConverter,
        ImageStorage $imageStorage,
        PostRepository $postRepository
    ) {
        $this->postToPostDtoConverter = $postToPostDtoConverter;
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
            return $this->postToPostDtoConverter->toDto($post, $this->getUser());
        }, $posts));
    }

    /**
     * @Route(methods={"POST"})
     */
    public function createPost(Request $request): JsonResponse
    {
        $createPostRequest = array(
            'text'     => $request->get('text'),
            'image'    => $request->files->get('image'),
            'exercise' => $request->get('exercise')
        );

        $post = new Post();
        $post->setAuthor($this->getUser());
        $post->setCreatedAt(new DateTime('now'));
        $post->setText($createPostRequest['text']);

        if ($createPostRequest['image']) {
            $filename = $this->imageStorage->store($createPostRequest['image']);
            $post->setImageFilename($filename);
        }

        if ($createPostRequest['exercise']) {
            $exercise = null;

            $type = $createPostRequest['exercise']['type'];
            if ($type === 'aorb') {
                $aorbExerciseRequest = array(
                    'sentences' => $createPostRequest['exercise']['sentences']
                );
                $exercise = $this->createAorbExercise($aorbExerciseRequest);
            } elseif ($type === 'whatdoyousee') {
                $whatdoyouseeExerciseRequest = array(
                    'image'   => $request->files->get('exercise')['image'],
                    'option1' => $createPostRequest['exercise']['option1'],
                    'option2' => $createPostRequest['exercise']['option2'],
                    'option3' => $createPostRequest['exercise']['option3'],
                    'option4' => $createPostRequest['exercise']['option4'],
                    'correct' => (int) $createPostRequest['exercise']['correct'],
                );
                $exercise = $this->createWhatdoyouseeExercise($whatdoyouseeExerciseRequest);
            } elseif ($type === 'missingword') {
                $missingwordExerciseRequest = array(
                    'textBefore'   => $createPostRequest['exercise']['textBefore'],
                    'textAfter'    => $createPostRequest['exercise']['textAfter'],
                    'option1'      => $createPostRequest['exercise']['option1'],
                    'option2'      => $createPostRequest['exercise']['option2'],
                    'option3'      => $createPostRequest['exercise']['option3'],
                    'option4'      => $createPostRequest['exercise']['option4'],
                    'correct'      => (int) $createPostRequest['exercise']['correct'],
                );
                $exercise = $this->createMissingwordExercise($missingwordExerciseRequest);
            } else {
                throw new RuntimeException('Exercise type not supported: '.$type);
            }

            $post->setExercise($exercise);
        }

        $post = $this->postRepository->save($post);
        return $this->json($this->postToPostDtoConverter->toDto($post, $this->getUser()));
    }

    public function createAorbExercise(array $aorbExerciseRequest): AorbExercise
    {
        $exercise = new AorbExercise();

        $sentences = array();
        foreach ($aorbExerciseRequest['sentences'] as $sentenceJson) {
            $sentence = new AorbSentence();
            $sentence->textBefore = $sentenceJson['textBefore'];

            $choice = new AorbChoice();
            $choice->a = $sentenceJson['choice']['a'];
            $choice->b = $sentenceJson['choice']['b'];
            $choice->correct = $sentenceJson['choice']['correct'];
            $sentence->choice = $choice;

            $sentence->textAfter = $sentenceJson['textAfter'];
            array_push($sentences, $sentence);
        }

        $exercise->setSentences($sentences);
        return $exercise;
    }

    public function createWhatdoyouseeExercise(array $whatdoyouseeExerciseRequest): WhatdoyouseeExercise
    {
        $exercise = new WhatdoyouseeExercise();

        $exercise->setImageFilename($this->imageStorage->store($whatdoyouseeExerciseRequest['image']));
        $exercise->setOption1($whatdoyouseeExerciseRequest['option1']);
        $exercise->setOption2($whatdoyouseeExerciseRequest['option2']);
        $exercise->setOption3($whatdoyouseeExerciseRequest['option3']);
        $exercise->setOption4($whatdoyouseeExerciseRequest['option4']);
        $exercise->setCorrect($whatdoyouseeExerciseRequest['correct']);

        return $exercise;
    }

    public function createMissingwordExercise(array $missingwordExerciseRequest): MissingwordExercise
    {
        $exercise = new MissingwordExercise();

        $exercise->setTextBefore($missingwordExerciseRequest['textBefore']);
        $exercise->setTextAfter($missingwordExerciseRequest['textAfter']);
        $exercise->setOption1($missingwordExerciseRequest['option1']);
        $exercise->setOption2($missingwordExerciseRequest['option2']);
        $exercise->setOption3($missingwordExerciseRequest['option3']);
        $exercise->setOption4($missingwordExerciseRequest['option4']);
        $exercise->setCorrect($missingwordExerciseRequest['correct']);

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