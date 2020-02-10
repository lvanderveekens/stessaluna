<?php

namespace App\Controller;

use App\Service\FileUploader;
use App\Service\UserConverter;
use Exception;
use Psr\Log\LoggerInterface;
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
    public function updateCurrentUser(Request $request, FileUploader $fileUploader): JsonResponse
    {
        $user = $this->getUser();

        /*
         * Avatar is null when user doesn't change it. How to let it stay the same...
         */
        $avatar = $request->files->get('avatar');

        if ($request->files->has("avatar")) {
            print("");
        } else {
            print("");
        }



        if ($avatar) {
            $imageFilename = $fileUploader->upload($avatar, $this->getParameter('images_directory'));
            $user->setAvatarFilename($imageFilename);
        } else {
            // TODO: only delete when avatar is set to default or something
            if ($user->getAvatarFilename()) {
                try {
                    $imagesDir = $this->getParameter('images_directory');
                    unlink($imagesDir . '/' . $user->getAvatarFilename());
                } catch (Exception $e) {
                    $this->logger->error($e);
                }
            }

            $user->setAvatarFilename(null);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        return $this->json($this->userConverter->toDto($user));
    }
}