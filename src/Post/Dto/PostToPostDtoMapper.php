<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Comment\Dto\CommentToCommentDtoMapper;
use Stessaluna\Exercise\Dto\ExerciseToExerciseDtoMapper;
use Stessaluna\Image\Dto\ImageToImageDtoMapper;
use Stessaluna\Post\Entity\Post;
use Stessaluna\User\Dto\UserToUserDtoMapper;
use Stessaluna\User\Entity\User;

class PostToPostDtoMapper
{
    /** @var UserToUserDtoMapper */
    private $userToUserDtoMapper;

    /** @var CommentToCommentDtoMapper */
    private $commentToCommentDtoMapper;

    /** @var ExerciseToExerciseDtoMapper */
    private $exerciseToExerciseDtoMapper;

    /** @var ImageToImageDtoMapper */
    private $imageToImageDtoMapper;

    public function __construct(
        UserToUserDtoMapper $userToUserDtoMapper,
        CommentToCommentDtoMapper $commentToCommentDtoMapper,
        ExerciseToExerciseDtoMapper $exerciseToExerciseDtoMapper,
        ImageToImageDtoMapper $imageToImageDtoMapper
    )
    {
        $this->userToUserDtoMapper = $userToUserDtoMapper;
        $this->commentToCommentDtoMapper = $commentToCommentDtoMapper;
        $this->exerciseToExerciseDtoMapper = $exerciseToExerciseDtoMapper;
        $this->imageToImageDtoMapper = $imageToImageDtoMapper;
    }

    public function map(Post $post, ?User $user): PostDto
    {
        $dto = new PostDto();
        $dto->id = $post->getId();
        $dto->createdAt = $post->getCreatedAt();
        $dto->modifiedAt = $post->getModifiedAt();
        $dto->author = $this->userToUserDtoMapper->map($post->getAuthor());
        $dto->text = $post->getText();
        $dto->channel = $post->getChannel();
        if ($post->getImage()) {
            $dto->image = $this->imageToImageDtoMapper->map($post->getImage());
        }
        if ($post->getExercise()) {
            $dto->exercise = $this->exerciseToExerciseDtoMapper->map($post->getExercise(), $user);
        }
        $dto->comments = array_map(function ($comment) {
            return $this->commentToCommentDtoMapper->map($comment);
        }, $post->getComments()->toArray());

        return $dto;
    }
}