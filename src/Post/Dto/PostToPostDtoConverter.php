<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Dto\ExerciseToExerciseDtoConverter;
use Stessaluna\Image\Storage\ImageStorage;
use Stessaluna\Post\Comment\Dto\CommentDtoConverter;
use Stessaluna\Post\Entity\Post;
use Stessaluna\User\Dto\UserDtoConverter;
use Stessaluna\User\Entity\User;

class PostToPostDtoConverter
{
    /** @var UserDtoConverter */
    private $userDtoConverter;

    /** @var CommentDtoConverter */
    private $commentDtoConverter;

    /** @var ExerciseToExerciseDtoConverter */
    private $exerciseToExerciseDtoConverter;

    /** @var ImageStorage */
    private $imageStorage;

    public function __construct(
        UserDtoConverter $userDtoConverter,
        CommentDtoConverter $commentDtoConverter,
        ExerciseToExerciseDtoConverter $exerciseToExerciseDtoConverter,
        ImageStorage $imageStorage
    ) {
        $this->userDtoConverter = $userDtoConverter;
        $this->commentDtoConverter = $commentDtoConverter;
        $this->exerciseToExerciseDtoConverter = $exerciseToExerciseDtoConverter;
        $this->imageStorage = $imageStorage;
    }

    public function convert(Post $post, ?User $user): PostDto
    {
        $dto = new PostDto();
        $dto->id = $post->getId();
        $dto->createdAt = $post->getCreatedAt();
        $dto->author = $this->userDtoConverter->toDto($post->getAuthor());
        $dto->text = $post->getText();
        $dto->channel = $post->getChannel();
        
        if ($post->getImageFilename()) {
            $dto->image = $this->imageStorage->getRelativePath($post->getImageFilename());
        }

        if ($post->getExercise()) {
            $dto->exercise = $this->exerciseToExerciseDtoConverter->convert($post->getExercise(), $user);
        }

        $dto->comments = array_map(function ($comment) {
            return $this->commentDtoConverter->toDto($comment);
        }, $post->getComments()->toArray());

        return $dto;
    }
}