<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use DateTime;
use Stessaluna\Exercise\Dto\ExerciseDtoToExerciseConverter;
use Stessaluna\Image\Repository\ImageRepository;
use Stessaluna\Post\Entity\Post;
use Stessaluna\User\Entity\User;

class CreatePostRequestToPostConverter
{
    /**
     * @var ImageRepository
     */
    private $imageRepository;
    /**
     * @var ExerciseDtoToExerciseConverter
     */
    private $exerciseDtoToExerciseConverter;

    public function __construct(ImageRepository $imageRepository, ExerciseDtoToExerciseConverter $exerciseDtoToExerciseConverter)
    {
        $this->imageRepository = $imageRepository;
        $this->exerciseDtoToExerciseConverter = $exerciseDtoToExerciseConverter;
    }

    public function convert(CreatePostRequest $request, User $user): Post
    {
        $post = new Post();
        $post->setAuthor($user);
        $post->setCreatedAt(new DateTime('now'));
        $post->setChannel($request->channel);
        $post->setText($request->text);
        if ($request->image) {
            $post->setImage($this->imageRepository->getReference($request->image->id));
        }
        if ($request->exercise) {
            $post->setExercise($this->exerciseDtoToExerciseConverter->convert($request->exercise));
        }
        return $post;
    }

}