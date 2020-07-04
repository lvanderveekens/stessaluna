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
        $optimizedImageFile = $this->imageOptimizer->optimize($imageFile);
        $filename = md5(uniqid());
        $this->imageStorage->store($optimizedImageFile, $filename);

        $image = new Image();
        $image->setFilename($filename);
        $image->setMimeType($imageFile->getMimeType());
        $this->imageRepository->save($image);

        return $image;
    }

    public function delete(Image $image) {
        $this->imageStorage->delete($image->getFilename());
        $this->imageRepository->delete($image);
    }
}