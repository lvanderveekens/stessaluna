<?php declare(strict_types=1);

namespace Stessaluna\User;

use Stessaluna\Image\ImageService;
use Stessaluna\Image\Repository\ImageRepository;
use Stessaluna\User\Entity\User;
use Stessaluna\User\Repository\UserRepository;

class UserService
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var ImageService
     */
    private $imageService;
    /**
     * @var ImageRepository
     */
    private $imageRepository;

    public function __construct(UserRepository $userRepository, ImageService $imageService,
                                ImageRepository $imageRepository)
    {
        $this->userRepository = $userRepository;
        $this->imageService = $imageService;
        $this->imageRepository = $imageRepository;
    }

    public function updateUser(User $user, int $avatarId, ?string $displayName, string $country): User
    {
        if ($avatarId !== User::DEFAULT_AVATAR_ID) {
            $avatar = $this->imageRepository->getReference($avatarId);
            $user->setAvatar($avatar);
        }
        $user->setDisplayName($displayName);
        $user->setCountry($country);
        return $this->userRepository->save($user);
    }
}