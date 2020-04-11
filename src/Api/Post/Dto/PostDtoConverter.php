<?php

namespace Stessaluna\Api\Post\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Dto\ExerciseDtoConverter;
use Stessaluna\Api\Post\Comment\Dto\CommentDtoConverter;
use Stessaluna\Api\User\Dto\UserDtoConverter;
use Stessaluna\Domain\Image\ImageStorage;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\User\Entity\User;

class PostDtoConverter
{
    private LoggerInterface $logger;
    private UserDtoConverter $userDtoConverter;
    private CommentDtoConverter $commentDtoConverter;
    private ExerciseDtoConverter $exerciseDtoConverter;
    private ImageStorage $imageStorage;

    public function __construct(
        LoggerInterface $logger,
        UserDtoConverter $userDtoConverter,
        CommentDtoConverter $commentDtoConverter,
        ExerciseDtoConverter $exerciseDtoConverter,
        ImageStorage $imageStorage
    ) {
        $this->logger = $logger;
        $this->userDtoConverter = $userDtoConverter;
        $this->commentDtoConverter = $commentDtoConverter;
        $this->exerciseDtoConverter = $exerciseDtoConverter;
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
            $dto->image = $this->imageStorage->getRelativeUrl($post->getImageFilename());
        }

        if ($post->getExercise()) {
            $dto->exercise = $this->exerciseDtoConverter->toDto($post->getExercise(), $user);
        }

        $dto->comments = array_map(function ($comment) {
            return $this->commentDtoConverter->toDto($comment);
        }, $post->getComments()->toArray());

        return $dto;
    }
}