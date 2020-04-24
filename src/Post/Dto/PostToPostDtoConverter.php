<?php

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Dto\ExerciseToExerciseDtoConverter;
use Stessaluna\Image\ImageStorage;
use Stessaluna\Post\Comment\Dto\CommentDtoConverter;
use Stessaluna\Post\Entity\Post;
use Stessaluna\User\Dto\UserDtoConverter;
use Stessaluna\User\Entity\User;

class PostToPostDtoConverter
{
    private UserDtoConverter $userDtoConverter;

    private CommentDtoConverter $commentDtoConverter;

    private ExerciseToExerciseDtoConverter $exerciseToExerciseDtoConverter;

    private ImageStorage $imageStorage;

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

    public function toDto(Post $post, User $user): PostDto
    {
        $dto = new PostDto();
        $dto->id = $post->getId();
        $dto->createdAt = $post->getCreatedAt();
        $dto->author = $this->userDtoConverter->toDto($post->getAuthor());

        $dto->text = $post->getText();
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