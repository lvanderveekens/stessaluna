<?php

namespace App\Controller;

use App\Dto\UserDto;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/users")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/me", methods={"GET"})
     */
    public function getCurrentUser(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createNotFoundException('Current user not found');
        }

        return $this->json($this->convertToDto($user));
    }

    private static function convertToDto(User $user): UserDto
    {
        $dto = new UserDto();
        $dto->setId($user->getId());
        $dto->setUserName($user->getUserName());
        $dto->setFirstName($user->getFirstName());
        $dto->setLastName($user->getLastName());
        return $dto;
    }
}