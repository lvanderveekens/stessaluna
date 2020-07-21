<?php declare(strict_types=1);

namespace Stessaluna\User\Dto;

use Psr\Log\LoggerInterface;
use Stessaluna\Image\Dto\ImageDto;
use Stessaluna\Image\Dto\ImageToImageDtoConverter;
use Stessaluna\User\Entity\User;
use Symfony\Component\Asset\Packages;

class UserToUserDtoConverter
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
     * @var ImageToImageDtoConverter
     */
    private $imageToImageDtoConverter;

    public function __construct(LoggerInterface $logger, Packages $packages,
                                ImageToImageDtoConverter $imageToImageDtoConverter)
    {
        $this->logger = $logger;
        $this->packages = $packages;
        $this->imageToImageDtoConverter = $imageToImageDtoConverter;
    }

    public function convert(User $user): UserDto
    {
        $dto = new UserDto();
        $dto->id = $user->getId();
        $dto->email = $user->getEmail();
        $dto->username = $user->getUsername();
        $dto->displayName = $user->getDisplayName();
        $dto->country = $user->getCountry();

        if ($user->getAvatar()) {
            $dto->avatar = $this->imageToImageDtoConverter->convert($user->getAvatar());
        } else {
            $imageDto = new ImageDto();
            $imageDto->id = User::DEFAULT_AVATAR_ID;
            $imageDto->url = $this->packages->getUrl('build/images/avatar-default.svg');
            $dto->avatar = $imageDto;
        }
        return $dto;
    }
}