<?php

namespace Stessaluna\Api\User\Controller;

use Exception;
use Psr\Log\LoggerInterface;
use Stessaluna\Api\User\Dto\UserConverter;
use Stessaluna\Infrastructure\FileUpload\FileUploader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/users")
 */
class UserController extends AbstractController
{
    private $userConverter;
    private $logger;

    public function __construct(UserConverter $userConverter, LoggerInterface $logger)
    {
        $this->userConverter = $userConverter;
        $this->logger = $logger;
    }

    /**
     * @Route("/me", methods={"GET"})
     */
    public function getCurrentUser(): JsonResponse
    {
        return $this->json($this->userConverter->toDto($this->getUser()));
    }

    /**
     * @Route("/me", methods={"PUT"})
     */
    // TODO: move to ProfileController?
    public function updateCurrentUser(Request $request, FileUploader $fileUploader): JsonResponse
    {
        $user = $this->getUser();

        $resetAvatar = filter_var($request->get("resetAvatar"), FILTER_VALIDATE_BOOLEAN);

        if ($resetAvatar) {
            if ($user->getAvatarFilename()) {
                try {
                    $imagesDir = $this->getParameter('images_directory');
                    unlink($imagesDir . '/' . $user->getAvatarFilename());
                } catch (Exception $e) {
                    $this->logger->error($e);
                }
            }
            $user->setAvatarFilename(null);
        } else if ($request->files->get("avatar")) {
            // TODO: refactor
            if ($user->getAvatarFilename()) {
                try {
                    $imagesDir = $this->getParameter('images_directory');
                    unlink($imagesDir . '/' . $user->getAvatarFilename());
                } catch (Exception $e) {
                    $this->logger->error($e);
                }
            }
            $avatar = $request->files->get("avatar");
            $imageFilename = $fileUploader->upload($avatar, $this->getParameter('images_directory'));
            $user->setAvatarFilename($imageFilename);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        return $this->json($this->userConverter->toDto($user));
    }
}