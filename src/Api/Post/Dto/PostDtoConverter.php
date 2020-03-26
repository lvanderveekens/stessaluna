<?php

namespace Stessaluna\Api\Post\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Api\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Api\Post\Exercise\Dto\ExercisePostDto;
use Stessaluna\Api\User\Dto\UserConverter;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Exercise\Entity\ExercisePost;

class PostDtoConverter
{
    private LoggerInterface $logger;

    private UserConverter $userConverter;

    public function __construct(LoggerInterface $logger, UserConverter $userConverter)
    {
        $this->logger = $logger;
        $this->userConverter = $userConverter;
    }

    public function toDto(Post $post): PostDto
    {
        $dto = null;
        if ($post instanceof ExercisePost) {

            $dto = new ExercisePostDto();

            $exercise = $post->getExercise();

            $exerciseDto = null;
            if ($exercise instanceof AorbExercise) {
                $exerciseDto = new AorbExerciseDto();

                $sentences = array_map(function ($s) {
                    $choice = new AorbChoiceDto($s->getChoice()->getA(), $s->getChoice()->getB());
                    return new AorbSentenceDto($s->getTextBefore(), $choice, $s->getTextAfter());
                }, $exercise->getSentences()->toArray());

                $exerciseDto->setSentences($sentences);
            }

            $dto->setExercise($exerciseDto);

            $userDto = $this->userConverter->toDto($post->getUser());

            $dto->setId($post->getId());
            // $dto->setText($post->getText());
            $dto->setUser($userDto);
            $dto->setCreatedAt($post->getCreatedAt());

            $comments = array_map(function ($comment) {
                return $this->commentConverter->toDto($comment);
            }, $post->getComments()->toArray());

            $dto->setComments($comments);
            $dto->setAvatar($userDto->getAvatar());
        }

        // $dto = new PostDto();

        // if ($post->getImageFilename()) {
        // TODO: move base upload path to a common place
        // $dto->setImage('/uploads/images/' .  $post->getImageFilename());
        // }
        return $dto;
    }
}
