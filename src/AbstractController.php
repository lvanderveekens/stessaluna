<?php
declare(strict_types=1);

namespace Stessaluna;


use Stessaluna\User\Entity\User;

class AbstractController extends \Symfony\Bundle\FrameworkBundle\Controller\AbstractController
{
    protected function getUser(): ?User
    {
        /** @var $user User|null */
        $user = parent::getUser();
        return $user;
    }
}

