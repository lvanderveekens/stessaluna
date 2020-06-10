<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use DateTime;
use RuntimeException;
use Stessaluna\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Exercise\Aorb\Dto\CreateAorbExercise;
use Stessaluna\Exercise\Aorb\Entity\AorbChoice;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Exercise\Dto\CreateExercise;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\Missingword\Dto\CreateMissingwordExercise;
use Stessaluna\Exercise\Missingword\Entity\MissingwordExercise;
use Stessaluna\Exercise\Whatdoyousee\Dto\CreateWhatdoyouseeExercise;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Image\ImageStorage;
use Stessaluna\Post\Entity\Post;
use Stessaluna\User\Entity\User;

class CreatePostToPostConverter
{
    /** @var ImageStorage */
    private $imageStorage;

    public function __construct(ImageStorage $imageStorage)
    {
        $this->imageStorage = $imageStorage;
    }

    public function convert(CreatePost $createPost, User $user): Post
    {
        $post = new Post();
        $post->setAuthor($user);
        $post->setCreatedAt(new DateTime('now'));
        $post->setChannel($createPost->channel);
        $post->setText($createPost->text);

        if ($createPost->image) {
            $post->setImageFilename($this->imageStorage->store($createPost->image));
        }
        if ($createPost->exercise) {
            $post->setExercise($this->toExercise($createPost->exercise));
        }
        return $post;
    }

    public function toExercise(CreateExercise $createExercise): Exercise
    {
        $exercise = null;
        if ($createExercise instanceof CreateAorbExercise) {
            $exercise = $this->toAorbExercise($createExercise);
        } elseif ($createExercise instanceof CreateWhatdoyouseeExercise) {
            $exercise = $this->toWhatdoyouseeExercise($createExercise);
        } elseif ($createExercise instanceof CreateMissingwordExercise) {
            $exercise = $this->toMissingwordExercise($createExercise);
        } else {
            throw new RuntimeException('Unsupported create exercise class: '.get_class($createExercise));
        }
        return $exercise;
    }

    public function toAorbExercise(CreateAorbExercise $createExercise): AorbExercise
    {
        $exercise = new AorbExercise();
        $exercise->setSentences(array_map(function (AorbSentenceDto $sentenceDto) {
            $sentence = new AorbSentence();
            $sentence->textBefore = $sentenceDto->textBefore;

            $choice = new AorbChoice();
            $choice->a = $sentenceDto->choice->a;
            $choice->b = $sentenceDto->choice->b;
            $choice->correct = $sentenceDto->choice->correct;
            $sentence->choice = $choice;

            $sentence->textAfter = $sentenceDto->textAfter;
            return $sentence;
        }, $createExercise->sentences));
        return $exercise;
    }

    public function toWhatdoyouseeExercise(CreateWhatdoyouseeExercise $createExercise): WhatdoyouseeExercise
    {
        $exercise = new WhatdoyouseeExercise();
        $exercise->setImageFilename($this->imageStorage->store($createExercise->image));
        $exercise->setOption1($createExercise->option1);
        $exercise->setOption2($createExercise->option2);
        $exercise->setOption3($createExercise->option3);
        $exercise->setOption4($createExercise->option4);
        $exercise->setCorrect($createExercise->correct);
        return $exercise;
    }

    public function toMissingwordExercise(CreateMissingwordExercise $createExercise): MissingwordExercise
    {
        $exercise = new MissingwordExercise();
        $exercise->setTextBefore($createExercise->textBefore);
        $exercise->setTextAfter($createExercise->textAfter);
        $exercise->setOption1($createExercise->option1);
        $exercise->setOption2($createExercise->option2);
        $exercise->setOption3($createExercise->option3);
        $exercise->setOption4($createExercise->option4);
        $exercise->setCorrect($createExercise->correct);
        return $exercise;
    }
}