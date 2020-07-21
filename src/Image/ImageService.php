<?php


namespace Stessaluna\Image;


use Stessaluna\Image\Entity\Image;
use Stessaluna\Image\Optimization\ImageOptimizer;
use Stessaluna\Image\Repository\ImageRepository;
use Stessaluna\Image\Storage\ImageStorage;
use Symfony\Component\HttpFoundation\File\File;

class ImageService
{
    /**
     * @var ImageOptimizer
     */
    private $imageOptimizer;
    /**
     * @var ImageStorage
     */
    private $imageStorage;
    /**
     * @var ImageRepository
     */
    private $imageRepository;

    public function __construct(ImageOptimizer $imageOptimizer, ImageStorage $imageStorage,
                                ImageRepository $imageRepository)
    {
        $this->imageOptimizer = $imageOptimizer;
        $this->imageStorage = $imageStorage;
        $this->imageRepository = $imageRepository;
    }

    public function store(File $imageFile): Image
    {
        $filename = md5(uniqid());
        $mimeType = $imageFile->getMimeType();

        $optimizedImageFile = $this->imageOptimizer->optimize($imageFile);
        $this->imageStorage->store($optimizedImageFile, $filename);

        $image = new Image();
        $image->setFilename($filename);
        $image->setMimeType($mimeType);
        $this->imageRepository->save($image);

        return $image;
    }
}