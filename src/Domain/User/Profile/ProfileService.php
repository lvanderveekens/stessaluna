<?php declare(strict_types=1);

namespace Stessaluna\Domain\User\Profile;

use Stessaluna\Domain\Image\ImageStorage;
use Stessaluna\Domain\User\Entity\User;
use Stessaluna\Domain\User\Repository\UserRepository;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ProfileService
{
    private UserRepository $userRepository;
    private ImageStorage $imageStorage;

    public function __construct(UserRepository $userRepository, ImageStorage $imageStorage)
    {
        $this->userRepository = $userRepository;
        $this->imageStorage = $imageStorage;
    }

    public function updateProfile(
        User $user,
        string $firstName,
        string $lastName,
        string $country,
        bool $resetAvatar,
        ?UploadedFile $avatar
    ): User {
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
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