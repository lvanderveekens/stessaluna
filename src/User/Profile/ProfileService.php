<?php declare(strict_types=1);

namespace Stessaluna\User\Profile;

use Stessaluna\Image\Storage\ImageStorage;
use Stessaluna\User\Entity\User;
use Stessaluna\User\Repository\UserRepository;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ProfileService
{
    /** @var UserRepository */
    private $userRepository;

    /** @var ImageStorage */
    private $imageStorage;

    public function __construct(UserRepository $userRepository, ImageStorage $imageStorage)
    {
        $this->userRepository = $userRepository;
        $this->imageStorage = $imageStorage;
    }

    public function updateProfile(
        User $user,
        ?string $displayName,
        string $country,
        bool $resetAvatar,
        ?UploadedFile $avatar
    ): User {
        $user->setDisplayName($displayName);
        $user->setCountry($country);
        if ($resetAvatar) {
            $this->resetAvatar($user);
        } elseif ($avatar) {
            $this->setAvatar($user, $avatar);
        }
        return $this->userRepository->save($user);
    }

    private function setAvatar(User $user, UploadedFile $avatar)
    {
        if ($user->getAvatarFilename()) {
            $this->imageStorage->delete($user->getAvatarFilename());
        }
        $user->setAvatarFilename($this->imageStorage->store($avatar));
    }

    private function resetAvatar(User $user)
    {
        if ($user->getAvatarFilename()) {
            $this->imageStorage->delete($user->getAvatarFilename());
        }
        $user->setAvatarFilename(null);
    }
}