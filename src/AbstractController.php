<?php
declare(strict_types=1);

namespace Stessaluna;


use Stessaluna\User\Entity\User;
use Symfony\Component\HttpFoundation\Request;

class AbstractController extends \Symfony\Bundle\FrameworkBundle\Controller\AbstractController
{
    protected function deserialize(Request $request, string $targetClass): object
    {
        return $this->get('serializer')->deserialize($request->getContent(), $targetClass, 'json');
    }

    protected function getUser(): ?User
    {
        /** @var $user User|null */
        $user = parent::getUser();
        return $user;
    }
}

