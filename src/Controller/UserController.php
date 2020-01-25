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

    // TODO: move away from the controller
    public static function convertToDto(User $user): UserDto
    {
        $dto = new UserDto();
        $dto->setUserName($user->getUserName());
        $dto->setFirstName($user->getFirstName());
        $dto->setLastName($user->getLastName());

        if ($user->getAvatarFilename()) {
            // TODO: move base upload path to a common place
            $dto->setAvatar('/uploads/avatars/' .  $user->getAvatarFilename());
        }
        return $dto;
    }
}