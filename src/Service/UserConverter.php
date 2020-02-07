<?php

namespace App\Service;

use App\Dto\UserDto;
use App\Entity\User;
use Psr\Log\LoggerInterface;
use Symfony\Component\Asset\Packages;

class UserConverter
{
    private $logger;
    private $packages;

    public function __construct(LoggerInterface $logger, Packages $packages)
    {
        $this->logger = $logger;
        $this->packages = $packages;
    }

    public function toDto(User $user) 
    {
        $dto = new UserDto();
        $dto->setUserName($user->getUsername());
        $dto->setFirstName($user->getFirstName());
        $dto->setLastName($user->getLastName());

        if ($user->getAvatarFilename()) {
            // TODO: move base upload path to a common place
            $dto->setAvatar('/uploads/avatars/' .  $user->getAvatarFilename());
        } else {
            $dto->setAvatar($this->packages->getUrl('build/images/default-avatar.svg'));
        }
        return $dto;
    }
}
