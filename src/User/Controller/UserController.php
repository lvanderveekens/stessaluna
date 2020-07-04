<?php declare(strict_types=1);

namespace Stessaluna\User\Controller;

use Stessaluna\User\Dto\UserToUserDtoConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/users")
 */
class UserController extends AbstractController
{
    /**
     * @var UserToUserDtoConverter
     */
    private $userToUserDtoConverter;

    public function __construct(UserToUserDtoConverter $userToUserDtoConverter)
    {
        $this->userToUserDtoConverter = $userToUserDtoConverter;
    }

    /**
     * @Route("/me", methods={"GET"})
     */
    public function getCurrentUser() : JsonResponse
    {
        return $this->json($this->userToUserDtoConverter->convert($this->getUser()));
    }
}