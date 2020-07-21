<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Dto\ExerciseToExerciseDtoConverter;
use Stessaluna\Image\Dto\ImageToImageDtoConverter;
use Stessaluna\Post\Comment\Dto\CommentToCommentDtoConverter;
use Stessaluna\Post\Entity\Post;
use Stessaluna\User\Dto\UserToUserDtoConverter;
use Stessaluna\User\Entity\User;

class PostToPostDtoConverter
{
    /** @var UserToUserDtoConverter */
    private $userDtoConverter;

    /** @var CommentToCommentDtoConverter */
    private $commentDtoConverter;

    /** @var ExerciseToExerciseDtoConverter */
    private $exerciseToExerciseDtoConverter;

    /** @var ImageToImageDtoConverter */
    private $imageToImageDtoConverter;

    public function __construct(
        UserToUserDtoConverter $userDtoConverter,
        CommentToCommentDtoConverter $commentDtoConverter,
        ExerciseToExerciseDtoConverter $exerciseToExerciseDtoConverter,
        ImageToImageDtoConverter $imageToImageDtoConverter
    )
    {
        $this->userDtoConverter = $userDtoConverter;
        $this->commentDtoConverter = $commentDtoConverter;
        $this->exerciseToExerciseDtoConverter = $exerciseToExerciseDtoConverter;
        $this->imageToImageDtoConverter = $imageToImageDtoConverter;
    }

    public function convert(Post $post, ?User $user): PostDto
    {
        $dto = new PostDto();
        $dto->id = $post->getId();
        $dto->createdAt = $post->getCreatedAt();
        $dto->author = $this->userDtoConverter->convert($post->getAuthor());
        $dto->text = $post->getText();
        $dto->channel = $post->getChannel();
        if ($post->getImage()) {
            $dto->image = $this->imageToImageDtoConverter->convert($post->getImage());
        }
        if ($post->getExercise()) {
            $dto->exercise = $this->exerciseToExerciseDtoConverter->convert($post->getExercise(), $user);
        }
        $dto->comments = array_map(function ($comment) {
            return $this->commentDtoConverter->convert($comment);
        }, $post->getComments()->toArray());

        return $dto;
    }
}