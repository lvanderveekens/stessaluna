<?php

namespace App\Controller;

use App\Dto\UserDto;
use App\Entity\User;
use App\Service\UserConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Asset\Packages;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/users")
 */
class UserController extends AbstractController
{
    private $userConverter;

    public function __construct(UserConverter $userConverter)
    {
        $this->userConverter = $userConverter;
    }

    /**
     * @Route("/me", methods={"GET"})
     */
    public function getCurrentUser(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createNotFoundException('Current user not found');
        }

        return $this->json($this->userConverter->toDto($user));
    }
}