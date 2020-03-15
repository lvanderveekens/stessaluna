<?php

namespace Stessaluna\DataFixtures;

use Stessaluna\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('luciano');
        $user->setPassword($this->passwordEncoder->encodePassword($user, 'luciano'));
        $manager->persist($user);

        // add more users here

        $manager->flush();
    }
}
