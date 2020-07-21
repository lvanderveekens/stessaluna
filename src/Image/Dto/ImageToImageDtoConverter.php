<?php
declare(strict_types=1);


namespace Stessaluna\Image\Dto;


use Stessaluna\Image\Entity\Image;
use Stessaluna\Image\Storage\ImageStorage;

class ImageToImageDtoConverter
{
    /**
     * @var ImageStorage
     */
    private $imageStorage;

    public function __construct(ImageStorage $imageStorage)
    {
        $this->imageStorage = $imageStorage;
    }

    public function convert(Image $image): ImageDto
    {
        $dto = new ImageDto();
        $dto->id = $image->getId();
        $dto->url = $this->imageStorage->getUrl($image->getFilename());
        return $dto;
    }
}