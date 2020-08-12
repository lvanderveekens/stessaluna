<?php declare(strict_types=1);

namespace Stessaluna\User\Controller;

use Stessaluna\AbstractController;
use Stessaluna\User\Dto\UpdateUserRequest;
use Stessaluna\User\Dto\UserToUserDtoConverter;
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
     * @var UserToUserDtoConverter
     */
    private $userToUserDtoConverter;
    /**
     * @var SerializerInterface
     */
    private $serializer;
    /**
     * @var UserService
     */
    private $userService;

    public function __construct(UserToUserDtoConverter $userToUserDtoConverter, SerializerInterface $serializer,
                                UserService $userService)
    {
        $this->userToUserDtoConverter = $userToUserDtoConverter;
        $this->serializer = $serializer;
        $this->userService = $userService;
    }

    /**
     * @Route("/me", methods={"GET"})
     */
    public function getCurrentUser(): JsonResponse
    {
        return $this->json($this->userToUserDtoConverter->convert($this->getUser()));
    }

    /**
     * @Route("/me", methods={"PUT"})
     */
    public function updateCurrentUser(Request $request): JsonResponse
    {
        /* @var $updateUserRequest UpdateUserRequest */
        $updateUserRequest = $this->serializer->deserialize($request->getContent(), UpdateUserRequest::class, 'json');

        $updatedUser = $this->userService->updateUser(
            $this->getUser(),
            $updateUserRequest->avatar->id,
            $updateUserRequest->displayName,
            $updateUserRequest->country
        );

        return $this->json($this->userToUserDtoConverter->convert($updatedUser));
    }
}