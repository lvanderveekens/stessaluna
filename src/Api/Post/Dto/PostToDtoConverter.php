<?php

namespace Stessaluna\Api\Post\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Dto\ExerciseToDtoConverter;
use Stessaluna\Api\Post\Comment\Dto\CommentDtoConverter;
use Stessaluna\Api\User\Dto\UserDtoConverter;
use Stessaluna\Domain\Image\ImageStorage;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Exercise\Entity\ExercisePost;
use Stessaluna\Domain\Post\Text\Entity\TextPost;
use Stessaluna\Domain\User\Entity\User;

class PostToDtoConverter
{
    private LoggerInterface $logger;
    private UserDtoConverter $userDtoConverter;
    private CommentDtoConverter $commentDtoConverter;
    private ExerciseToDtoConverter $exerciseToDtoConverter;
    private ImageStorage $imageStorage;

    public function __construct(
        LoggerInterface $logger,
        UserDtoConverter $userDtoConverter,
        CommentDtoConverter $commentDtoConverter,
        ExerciseToDtoConverter $exerciseToDtoConverter,
        ImageStorage $imageStorage
    )
    {
        $this->logger = $logger;
        $this->userDtoConverter = $userDtoConverter;
        $this->commentDtoConverter = $commentDtoConverter;
        $this->exerciseToDtoConverter = $exerciseToDtoConverter;
        $this->imageStorage = $imageStorage;
    }

    public function toDto(Post $post, User $user): PostDto
    {
        $dto = null;

        if ($post instanceof TextPost) {
            $dto = new TextPostDto();
            $dto->text = $post->getText();
            if ($post->getImageFilename()) {
                $dto->imagePath = $this->imageStorage->getRelativeUrl($post->getImageFilename());
            }
        }
        if ($post instanceof ExercisePost) {
            $dto = new ExercisePostDto();
            $dto->exercise = $this->exerciseToDtoConverter->toDto($post->getExercise(), $user);
        }

        $dto->id = $post->getId();
        $dto->author = $this->userDtoConverter->toDto($post->getUser());
        $dto->createdAt = $post->getCreatedAt();

        $comments = array_map(function ($comment) {
            return $this->commentDtoConverter->toDto($comment);
        }, $post->getComments()->toArray());

        $dto->comments = $comments;
        return $dto;
    }
}
