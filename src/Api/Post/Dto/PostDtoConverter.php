<?php

namespace Stessaluna\Api\Post\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Api\Exercise\Dto\ExerciseDtoConverter;
use Stessaluna\Api\Post\Comment\Dto\CommentDtoConverter;
use Stessaluna\Api\Post\Exercise\Dto\ExercisePostDto;
use Stessaluna\Api\User\Dto\UserDtoConverter;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Exercise\Entity\ExercisePost;
use Stessaluna\Domain\User\Entity\User;

class PostDtoConverter
{
    private LoggerInterface $logger;

    private UserDtoConverter $userDtoConverter;
    
    private CommentDtoConverter $commentDtoConverter;

    private ExerciseDtoConverter $exerciseDtoConverter;

    public function __construct(
        LoggerInterface $logger,
        UserDtoConverter $userDtoConverter,
        CommentDtoConverter $commentDtoConverter,
        ExerciseDtoConverter $exerciseDtoConverter
    )
    {
        $this->logger = $logger;
        $this->userDtoConverter = $userDtoConverter;
        $this->commentDtoConverter = $commentDtoConverter;
        $this->exerciseDtoConverter = $exerciseDtoConverter;
    }

    public function toDto(Post $post, User $user): PostDto
    {
        $dto = null;
        if ($post instanceof ExercisePost) {

            $dto = new ExercisePostDto();
            $dto->id = $post->getId();
            $dto->exercise = $this->exerciseDtoConverter->toDto($post->getExercise(), $user);
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
