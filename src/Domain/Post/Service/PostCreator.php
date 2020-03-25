<?php

namespace Stessaluna\Domain\Post\Service;

use Stessaluna\Domain\Post\Aorb\Entity\AorbPost;
use Stessaluna\Domain\Post\Aorb\Entity\AorbSentence;
use Stessaluna\Domain\User\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Stessaluna\Domain\Post\Aorb\Entity\AorbChoice;

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

    public function createAorbPost(array $sentences, User $user): AorbPost
    {
        $post = new AorbPost();
        $post->setUser($user);
        $post->setCreatedAt(new DateTime('now'));

        foreach ($sentences as $s) {
            $sentence = new AorbSentence();
            $sentence->setTextBefore($s['textBefore']);

            $choice = new AorbChoice();
            $choice->setA($s['choice']['a']);
            $choice->setB($s['choice']['b']);
            $choice->setCorrect($s['choice']['correct']);
            $sentence->setChoice($choice);

            $sentence->setTextAfter($s['textAfter']);

            $post->addSentence($sentence);
        }

        $this->em->persist($post);
        $this->em->flush();

        return $post; 
    }
}