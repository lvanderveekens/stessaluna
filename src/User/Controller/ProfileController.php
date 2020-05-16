<?php declare(strict_types=1);

namespace Stessaluna\User\Controller;

use Psr\Log\LoggerInterface;
use Stessaluna\User\Dto\UserDtoConverter;
use Stessaluna\User\Profile\ProfileService;
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
        $updatedUser = $this->profileService->updateProfile(
            $this->getUser(),
            $request->get('displayName'),
            $request->get('country'),
            $request->get('resetAvatar') === 'true',
            $request->files->get('avatar')
        );
        return $this->json($this->userDtoConverter->toDto($updatedUser));
    }
}