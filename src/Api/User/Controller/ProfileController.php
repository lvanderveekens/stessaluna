<?php declare(strict_types=1);

namespace Stessaluna\Api\User\Controller;

use Psr\Log\LoggerInterface;
use Stessaluna\Api\User\Dto\UserDtoConverter;
use Stessaluna\Domain\User\Service\ProfileService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/profile")
 */
class ProfileController extends AbstractController
{
    private LoggerInterface $logger;
    private ProfileService $profileService;
    private UserDtoConverter $userDtoConverter;

    public function __construct(
        LoggerInterface $logger,
        ProfileService $profileService,
        UserDtoConverter $userDtoConverter
    ) {
        $this->logger = $logger;
        $this->profileService = $profileService;
        $this->userDtoConverter = $userDtoConverter;
    }

    /**
     * @Route( methods={"POST"})
     */
    public function updateProfile(Request $request)
    {
        $resetAvatar = filter_var($request->get('resetAvatar'), FILTER_VALIDATE_BOOLEAN);
        $avatarFile = $request->files->get('avatar');

        $updatedUser = $this->profileService->updateProfile($this->getUser(), $resetAvatar, $avatarFile);
        return $this->json($this->userDtoConverter->toDto($updatedUser));
    }
}