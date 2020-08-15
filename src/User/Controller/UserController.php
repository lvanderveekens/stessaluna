<?php declare(strict_types=1);

namespace Stessaluna\User\Controller;

use Stessaluna\AbstractController;
use Stessaluna\User\Dto\UpdateUserRequest;
use Stessaluna\User\Dto\UserToUserDtoMapper;
use Stessaluna\User\UserService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/users")
 */
class UserController extends AbstractController
{
    /**
     * @var UserToUserDtoMapper
     */
    private $userToUserDtoMapper;
    /**
     * @var SerializerInterface
     */
    private $serializer;
    /**
     * @var UserService
     */
    private $userService;

    public function __construct(UserToUserDtoMapper $userToUserDtoMapper, SerializerInterface $serializer,
                                UserService $userService)
    {
        $this->userToUserDtoMapper = $userToUserDtoMapper;
        $this->serializer = $serializer;
        $this->userService = $userService;
    }

    /**
     * @Route("/me", methods={"GET"})
     */
    public function getCurrentUser(): JsonResponse
    {
        return $this->json($this->userToUserDtoMapper->map($this->getUser()));
    }

    /**
     * @Route("/me", methods={"PUT"})
     */
    public function updateCurrentUser(Request $request): JsonResponse
    {
        /* @var $updateUserRequest UpdateUserRequest */
        $updateUserRequest = $this->deserialize($request, UpdateUserRequest::class);

        $updatedUser = $this->userService->updateUser(
            $this->getUser(),
            $updateUserRequest->avatar->id,
            $updateUserRequest->displayName,
            $updateUserRequest->country
        );

        return $this->json($this->userToUserDtoMapper->map($updatedUser));
    }
}