<?php declare(strict_types=1);

namespace Stessaluna\User\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Image\Dto\ImageDto;
use Stessaluna\Image\Dto\ImageToImageDtoMapper;
use Stessaluna\User\Entity\User;
use Symfony\Component\Asset\Packages;

class UserToUserDtoMapper
{
    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var Packages
     */
    private $packages;

    /**
     * @var ImageToImageDtoMapper
     */
    private $imageToImageDtoMapper;

    public function __construct(
        LoggerInterface $logger,
        Packages $packages,
        ImageToImageDtoMapper $imageToImageDtoMapper
    )
    {
        $this->logger = $logger;
        $this->packages = $packages;
        $this->imageToImageDtoMapper = $imageToImageDtoMapper;
    }

    public function map(User $user): UserDto
    {
        $dto = new UserDto();
        $dto->id = $user->getId();
        $dto->email = $user->getEmail();
        $dto->username = $user->getUsername();
        $dto->displayName = $user->getDisplayName();
        $dto->country = $user->getCountry();

        if ($user->getAvatar()) {
            $dto->avatar = $this->imageToImageDtoMapper->map($user->getAvatar());
        } else {
            $imageDto = new ImageDto();
            $imageDto->id = User::DEFAULT_AVATAR_ID;
            $imageDto->url = $this->packages->getUrl('build/images/avatar/default.svg');
            $dto->avatar = $imageDto;
        }
        return $dto;
    }
}