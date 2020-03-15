<?php

namespace App\Service\Post;

use App\Entity\AorbPost;
use App\Entity\AorbSentence;
use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class PostCreator
{
    private $logger;

    private $em;

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