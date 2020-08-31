<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Comment\Dto\CommentToCommentDtoMapper;
use Stessaluna\Comment\Entity\Comment;
use Stessaluna\Exercise\ExerciseConverter;
use Stessaluna\Image\Dto\ImageToImageDtoMapper;
use Stessaluna\Post\Entity\Post;
use Stessaluna\User\Dto\UserToUserDtoMapper;
use Stessaluna\User\Entity\User;
use Stessaluna\Vote\Dto\VoteToVoteDtoMapper;
use Stessaluna\Vote\Entity\Vote;

class PostToPostDtoMapper
{
    /**
     * @var UserToUserDtoMapper
     */
    private $userToUserDtoMapper;

    /**
     * @var CommentToCommentDtoMapper
     */
    private $commentToCommentDtoMapper;

    /**
     * @var ExerciseConverter
     */
    private $exerciseConverter;

    /**
     * @var ImageToImageDtoMapper
     */
    private $imageToImageDtoMapper;

    /**
     * @var VoteToVoteDtoMapper
     */
    private $voteToVoteDtoMapper;

    public function __construct(
        UserToUserDtoMapper $userToUserDtoMapper,
        CommentToCommentDtoMapper $commentToCommentDtoMapper,
        ExerciseConverter $exerciseConverter,
        ImageToImageDtoMapper $imageToImageDtoMapper,
        VoteToVoteDtoMapper $voteToVoteDtoMapper
    )
    {
        $this->userToUserDtoMapper = $userToUserDtoMapper;
        $this->commentToCommentDtoMapper = $commentToCommentDtoMapper;
        $this->exerciseConverter = $exerciseConverter;
        $this->imageToImageDtoMapper = $imageToImageDtoMapper;
        $this->voteToVoteDtoMapper = $voteToVoteDtoMapper;
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

        $dto->votes = array_map(function (Vote $vote) {
            return $this->voteToVoteDtoMapper->map($vote);
        }, $post->getVotes()->toArray());

        if ($post->getExercise()) {
            $dto->exercise = $this->exerciseConverter->toDto($post->getExercise(), $user);
        }

        $dto->comments = array_map(function (Comment $comment) {
            return $this->commentToCommentDtoMapper->map($comment);
        }, $post->getComments()->toArray());

        return $dto;
    }
}