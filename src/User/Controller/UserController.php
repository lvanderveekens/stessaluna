<?php declare(strict_types=1);

namespace Stessaluna\User\Controller;

use Stessaluna\User\Dto\UserDtoConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/users")
 */
class UserController extends AbstractController
{
    private UserDtoConverter $userDtoConverter;

    public function __construct(UserDtoConverter $userDtoConverter)
    {
        $this->userDtoConverter = $userDtoConverter;
    }

    /**
     * @Route("/me", methods={"GET"})
     */
    public function getCurrentUser() : JsonResponse
    {
        return $this->json($this->userDtoConverter->toDto($this->getUser()));
    }
}