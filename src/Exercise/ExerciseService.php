<?php
declare(strict_types=1);


namespace Stessaluna\Exercise;


use RuntimeException;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\Missingword\Entity\MissingwordExercise;
use Stessaluna\Exercise\Repository\ExerciseRepository;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Post\Repository\PostRepository;
use Stessaluna\User\Entity\User;

class ExerciseService
{

    /** @var ExerciseRepository */
    private $exerciseRepository;

    /** @var PostRepository */
    private $postRepository;

    public function __construct(ExerciseRepository $exerciseRepository, PostRepository $postRepository)
    {
        $this->exerciseRepository = $exerciseRepository;
        $this->postRepository = $postRepository;
    }

    public function updateExercise(?Exercise $exercise, ?Exercise $update): ?Exercise
    {
        if ($exercise == null || $update == null || $exercise->getType() != $update->getType()) {
            return $update;
        }
        if ($exercise->equals($update)) {
            // nothing changed
            return $exercise;
        }
        $updated = $this->updateExerciseBasedOnType($exercise, $update);
        $updated->getAnswers()->clear();
        return $this->exerciseRepository->save($updated);
    }

    private function updateExerciseBasedOnType(Exercise $exercise, Exercise $update): Exercise
    {
        switch (true) {
            case $exercise instanceof AorbExercise:
                /** @var $update AorbExercise */
                return $this->updateAorbExercise($exercise, $update);
            case $exercise instanceof WhatdoyouseeExercise:
                /** @var $update WhatdoyouseeExercise */
                return $this->updateWhatdoyouseeExercise($exercise, $update);
            case $exercise instanceof MissingwordExercise:
                /** @var $update MissingwordExercise */
                return $this->updateMissingwordExercise($exercise, $update);
            default:
                throw new RuntimeException("Cannot update unsupported exercise type: " . $exercise->getType());
        }
    }

    private function updateAorbExercise(AorbExercise $exercise, AorbExercise $update): AorbExercise
    {
        $exercise->setSentences($update->getSentences());
        return $exercise;
    }

    private function updateWhatdoyouseeExercise(WhatdoyouseeExercise $exercise, WhatdoyouseeExercise $update): WhatdoyouseeExercise
    {
        $exercise->setImage($update->getImage());
        $exercise->setOption1($update->getOption1());
        $exercise->setOption2($update->getOption2());
        $exercise->setOption3($update->getOption3());
        $exercise->setOption4($update->getOption4());
        $exercise->setCorrect($update->getCorrect());
        return $exercise;
    }

    private function updateMissingwordExercise(MissingwordExercise $exercise, MissingwordExercise $update): MissingwordExercise
    {
        $exercise->setTextBefore($update->getTextBefore());
        $exercise->setTextAfter($update->getTextAfter());
        $exercise->setOption1($update->getOption1());
        $exercise->setOption2($update->getOption2());
        $exercise->setOption3($update->getOption3());
        $exercise->setOption4($update->getOption4());
        $exercise->setCorrect($update->getCorrect());
        return $exercise;
    }

    public function isAuthor(Exercise $exercise, ?User $user): bool
    {
        if (empty($user)) {
            return false;
        }
        $post = $this->postRepository->findOneBy(array('exercise' => $exercise));
        return $user->getId() == $post->getAuthor()->getId();
    }
}