<?php

declare(strict_types=1);

namespace Stessaluna\Domain\Post\Service;

use Stessaluna\Domain\Post\Aorb\Entity\AorbPost;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Domain\User\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbChoice;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbSentence as EntityAorbSentence;
use Stessaluna\Domain\Post\Exercise\Entity\ExercisePost;

class PostCreator
{
    private $logger;

    private $em;

    // TODO: Use repository interface instead of entity manager?
    public function __construct(LoggerInterface $logger, EntityManagerInterface $em)
    {
        $this->logger = $logger;
        $this->em = $em;
    }

    public function createAorbExercisePost(array $sentences, User $user): ExercisePost
    {
        $post = new ExercisePost();
        $post->setUser($user);
        $post->setCreatedAt(new DateTime('now'));

        $exercise = new AorbExercise();

        foreach ($sentences as $s) {
            $sentence = new AorbSentence();
            $sentence->setTextBefore($s['textBefore']);

            $choice = new AorbChoice();
            $choice->setA($s['choice']['a']);
            $choice->setB($s['choice']['b']);
            $choice->setCorrect($s['choice']['correct']);
            $sentence->setChoice($choice);

            $sentence->setTextAfter($s['textAfter']);

            $exercise->addSentence($sentence);
        }

        $post->setExercise($exercise);

        $this->em->persist($post);
        $this->em->flush();

        return $post; 
    }
}