<?php declare(strict_types=1);

namespace Stessaluna\User;

use Stessaluna\Image\ImageService;
use Stessaluna\User\Entity\User;
use Stessaluna\User\Repository\UserRepository;
use Symfony\Component\HttpFoundation\File\File;

class ProfileUpdater
{
    /** @var UserRepository */
    private $userRepository;

    /** @var ImageService */
    private $imageService;

    public function __construct(UserRepository $userRepository, ImageService $imageService)
    {
        $this->userRepository = $userRepository;
        $this->imageService = $imageService;
    }

    public function update(
        User $user,
        ?string $displayName,
        string $country,
        bool $resetAvatar,
        ?File $avatar
    ): User
    {
        $user->setDisplayName($displayName);
        $user->setCountry($country);
        if ($resetAvatar) {
            $this->resetAvatar($user);
        } elseif ($avatar) {
            $this->setAvatar($user, $avatar);
        }
        return $this->userRepository->save($user);
    }

    private function setAvatar(User $user, File $avatar)
    {
        if ($user->getAvatar()) {
            $this->imageService->delete($user->getAvatar());
        }
        $user->setAvatar($this->imageService->store($avatar));
    }

    private function resetAvatar(User $user)
    {
        if ($user->getAvatar()) {
            $this->imageService->delete($user->getAvatar());
        }
        $user->setAvatar(null);
    }
}