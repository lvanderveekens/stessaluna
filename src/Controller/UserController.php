<?php

namespace App\Controller;

use App\Dto\UserDto;
use App\Entity\User;
use App\Service\FileUploader;
use App\Service\UserConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Asset\Packages;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
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
        return $this->json($this->userConverter->toDto($this->getUser()));
    }

    /**
     * @Route("/me", methods={"POST"})
     */
    public function updateCurrentUser(Request $request, FileUploader $fileUploader): JsonResponse
    {
        // TODO: should be a PUT, but then I cannot read form data...?
        $user = $this->getUser();

        $avatar = $request->files->get('avatar');
        if ($avatar) {
            $imageFilename = $fileUploader->upload($avatar, $this->getParameter('images_directory'));
            $user-> setAvatarFilename($imageFilename);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        return $this->json($this->userConverter->toDto($user));
    }
}