<?php

namespace Stessaluna\Domain\Post\Service;

use Stessaluna\Domain\Post\Aorb\Entity\AorbPost;
use Stessaluna\Domain\Post\Aorb\Entity\AorbSentence;
use Stessaluna\Domain\User\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class PostCreator
{
    private $logger;

    private $em;

    // TODO: Use repository instead!
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
            $sentence->setChoiceA($s['choice']['a']);
            $sentence->setChoiceB($s['choice']['b']);
            $sentence->setTextAfter($s['textAfter']);

            $post->addSentence($sentence);
        }

        $this->em->persist($post);
        $this->em->flush();

        return $post; 
    }
}