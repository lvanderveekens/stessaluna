<?php

namespace Stessaluna\Api\User\Controller;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\User\Dto\UserDtoConverter;
use Stessaluna\Domain\Image\ImageStorage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/users")
 */
class UserController extends AbstractController
{
    private LoggerInterface $logger;
    private UserDtoConverter $userDtoConverter;
    private ImageStorage $imageStorage;

    public function __construct(LoggerInterface $logger, UserDtoConverter $userDtoConverter, ImageStorage $imageStorage)
    {
        $this->logger = $logger;
        $this->userDtoConverter = $userDtoConverter;
        $this->imageStorage = $imageStorage;
    }

    /**
     * @Route("/me", methods={"GET"})
     */
    public function getCurrentUser(): JsonResponse
    {
        return $this->json($this->userDtoConverter->toDto($this->getUser()));
    }

    /**
     * @Route("/me", methods={"PUT"})
     */
    // TODO: move to ProfileController?
    public function updateCurrentUser(Request $request): JsonResponse
    {
        $user = $this->getUser();

        $resetAvatar = filter_var($request->get("resetAvatar"), FILTER_VALIDATE_BOOLEAN);

        if ($resetAvatar) {
            if ($user->getAvatarFilename()) {
                $this->imageStorage->delete($user->getAvatarFilename());
            }
            $user->setAvatarFilename(null);
        } else if ($request->files->get("avatar")) {
            if ($user->getAvatarFilename()) {
                $this->imageStorage->delete($user->getAvatarFilename());
            }
            $avatar = $request->files->get("avatar");
            $user->setAvatarFilename($this->imageStorage->store($avatar));
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        return $this->json($this->userDtoConverter->toDto($user));
    }
}