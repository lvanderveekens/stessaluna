<?php declare(strict_types=1);

namespace Stessaluna\User\Controller;

use Psr\Log\LoggerInterface;
use Stessaluna\User\Dto\UserDtoConverter;
use Stessaluna\User\ProfileUpdater;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/profile")
 */
class ProfileController extends AbstractController
{
    /** @var LoggerInterface */
    private $logger;

    /** @var ProfileUpdater */
    private $profileUpdater;

    /** @var UserDtoConverter */
    private $userDtoConverter;

    public function __construct(
        LoggerInterface $logger,
        ProfileUpdater $profileUpdater,
        UserDtoConverter $userDtoConverter
    ) {
        $this->logger = $logger;
        $this->profileUpdater = $profileUpdater;
        $this->userDtoConverter = $userDtoConverter;
    }

    /**
     * @Route( methods={"POST"})
     */
    public function updateProfile(Request $request)
    {
        $updatedUser = $this->profileUpdater->update(
            $this->getUser(),
            $request->get('displayName'),
            $request->get('country'),
            $request->get('resetAvatar') === 'true',
            $request->files->get('avatar')
        );
        return $this->json($this->userDtoConverter->toDto($updatedUser));
    }
}