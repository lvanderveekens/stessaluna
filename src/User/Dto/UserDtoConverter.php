<?php declare(strict_types=1);

namespace Stessaluna\User\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\User\Entity\User;
use Symfony\Component\Asset\Packages;

class UserDtoConverter
{
    /** @var LoggerInterface */
    private $logger;

    /** @var Packages */
    private $packages;

    public function __construct(LoggerInterface $logger, Packages $packages)
    {
        $this->logger = $logger;
        $this->packages = $packages;
    }

    public function toDto(User $user): UserDto
    {
        $dto = new UserDto();
        $dto->id = $user->getId();
        $dto->email = $user->getEmail();
        $dto->username = $user->getUsername();
        $dto->displayName = $user->getDisplayName();
        $dto->country = $user->getCountry();

        if ($user->getAvatarFilename()) {
            // TODO: move base upload path to a common place
            $dto->avatar = '/uploads/images/'.$user->getAvatarFilename();
        } else {
            $dto->avatar = $this->packages->getUrl('build/images/avatar-default.svg');
        }
        return $dto;
    }
}