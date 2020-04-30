<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Post\Entity\Post;

class CreatePostRequestToPostConverter
{
    public function convert(CreatePostRequest $request): Post
    {
        $post = new Post();
        $post->setAuthor($this->getUser());
        $post->setCreatedAt(new DateTime('now'));
        $post->setText($createPostRequest['text']);

        if ($createPostRequest['image']) {
            $filename = $this->imageStorage->store($createPostRequest['image']);
            $post->setImageFilename($filename);
        }

        if ($createPostRequest['exercise']) {
            $exercise = null;

            $type = $createPostRequest['exercise']['type'];
            if ($type === 'aorb') {
                $aorbExerciseRequest = array(
                    'sentences' => $createPostRequest['exercise']['sentences']
                );
                $exercise = $this->createAorbExercise($aorbExerciseRequest);
            } elseif ($type === 'whatdoyousee') {
                $whatdoyouseeExerciseRequest = array(
                    'image'   => $request->files->get('exercise')['image'],
                    'option1' => $createPostRequest['exercise']['option1'],
                    'option2' => $createPostRequest['exercise']['option2'],
                    'option3' => $createPostRequest['exercise']['option3'],
                    'option4' => $createPostRequest['exercise']['option4'],
                    'correct' => (int) $createPostRequest['exercise']['correct'],
                );
                $exercise = $this->createWhatdoyouseeExercise($whatdoyouseeExerciseRequest);
            } elseif ($type === 'missingword') {
                $missingwordExerciseRequest = array(
                    'textBefore'   => $createPostRequest['exercise']['textBefore'],
                    'textAfter'    => $createPostRequest['exercise']['textAfter'],
                    'option1'      => $createPostRequest['exercise']['option1'],
                    'option2'      => $createPostRequest['exercise']['option2'],
                    'option3'      => $createPostRequest['exercise']['option3'],
                    'option4'      => $createPostRequest['exercise']['option4'],
                    'correct'      => (int) $createPostRequest['exercise']['correct'],
                );
                $exercise = $this->createMissingwordExercise($missingwordExerciseRequest);
            } else {
                throw new RuntimeException('Exercise type not supported: '.$type);
            }

            $post->setExercise($exercise);
        }
    }

    public function createAorbExercise(array $aorbExerciseRequest): AorbExercise
    {
        $exercise = new AorbExercise();

        $sentences = array();
        foreach ($aorbExerciseRequest['sentences'] as $sentenceJson) {
            $sentence = new AorbSentence();
            $sentence->textBefore = $sentenceJson['textBefore'];

            $choice = new AorbChoice();
            $choice->a = $sentenceJson['choice']['a'];
            $choice->b = $sentenceJson['choice']['b'];
            $choice->correct = $sentenceJson['choice']['correct'];
            $sentence->choice = $choice;

            $sentence->textAfter = $sentenceJson['textAfter'];
            array_push($sentences, $sentence);
        }

        $exercise->setSentences($sentences);
        return $exercise;
    }

    public function createWhatdoyouseeExercise(array $whatdoyouseeExerciseRequest): WhatdoyouseeExercise
    {
        $exercise = new WhatdoyouseeExercise();

        $exercise->setImageFilename($this->imageStorage->store($whatdoyouseeExerciseRequest['image']));
        $exercise->setOption1($whatdoyouseeExerciseRequest['option1']);
        $exercise->setOption2($whatdoyouseeExerciseRequest['option2']);
        $exercise->setOption3($whatdoyouseeExerciseRequest['option3']);
        $exercise->setOption4($whatdoyouseeExerciseRequest['option4']);
        $exercise->setCorrect($whatdoyouseeExerciseRequest['correct']);

        return $exercise;
    }

    public function createMissingwordExercise(array $missingwordExerciseRequest): MissingwordExercise
    {
        $exercise = new MissingwordExercise();

        $exercise->setTextBefore($missingwordExerciseRequest['textBefore']);
        $exercise->setTextAfter($missingwordExerciseRequest['textAfter']);
        $exercise->setOption1($missingwordExerciseRequest['option1']);
        $exercise->setOption2($missingwordExerciseRequest['option2']);
        $exercise->setOption3($missingwordExerciseRequest['option3']);
        $exercise->setOption4($missingwordExerciseRequest['option4']);
        $exercise->setCorrect($missingwordExerciseRequest['correct']);

        return $exercise;
    }
}