<?php

namespace Stessaluna\Api\Post\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Dto\ExerciseToDtoConverter;
use Stessaluna\Api\Post\Comment\Dto\CommentDtoConverter;
use Stessaluna\Api\Post\Exercise\Dto\ExercisePostDto;
use Stessaluna\Api\User\Dto\UserDtoConverter;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Exercise\Entity\ExercisePost;
use Stessaluna\Domain\User\Entity\User;

class PostDtoConverter
{
    private LoggerInterface $logger;

    private UserDtoConverter $userDtoConverter;
    
    private CommentDtoConverter $commentDtoConverter;

    private ExerciseToDtoConverter $exerciseToDtoConverter;

    public function __construct(
        LoggerInterface $logger,
        UserDtoConverter $userDtoConverter,
        CommentDtoConverter $commentDtoConverter,
        ExerciseToDtoConverter $exerciseToDtoConverter
    )
    {
        $this->logger = $logger;
        $this->userDtoConverter = $userDtoConverter;
        $this->commentDtoConverter = $commentDtoConverter;
        $this->exerciseToDtoConverter = $exerciseToDtoConverter;
    }

    public function toDto(Post $post, User $user): PostDto
    {
        $dto = null;
        if ($post instanceof ExercisePost) {

            $dto = new ExercisePostDto();
            $dto->id = $post->getId();
            $dto->exercise = $this->exerciseToDtoConverter->toDto($post->getExercise(), $user);
            $dto->author = $this->userDtoConverter->toDto($post->getUser());
            $dto->createdAt = $post->getCreatedAt();

            $comments = array_map(function ($comment) {
                return $this->commentDtoConverter->toDto($comment);
            }, $post->getComments()->toArray());

            $dto->comments = $comments;
        }

        // $dto = new PostDto();

        // if ($post->getImageFilename()) {
        // TODO: move base upload path to a common place
        // $dto->setImage('/uploads/images/' .  $post->getImageFilename());
        // }
        return $dto;
    }
}
