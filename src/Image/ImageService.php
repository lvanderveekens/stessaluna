<?php


namespace Stessaluna\Image;


use Stessaluna\Image\Optimization\ImageOptimizer;
use Stessaluna\Image\Storage\ImageStorage;
use Symfony\Component\HttpFoundation\File\UploadedFile;

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

    public function __construct(ImageOptimizer $imageOptimizer, ImageStorage $imageStorage)
    {
        $this->imageOptimizer = $imageOptimizer;
        $this->imageStorage = $imageStorage;
    }

    /**
     * Store an uploaded image.
     * @return string the filename
     */
    public function storeImage(UploadedFile $uploadedImage): string
    {
        $optimizedImage = $this->imageOptimizer->optimize($uploadedImage);

        $originalFilename = pathinfo($uploadedImage->getClientOriginalName(), PATHINFO_FILENAME);
        // this is needed to safely include the filename as part of the URL
        $safeFilename = transliterator_transliterate(
            'Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()',
            $originalFilename
        );
        $filename = $safeFilename . '-' . uniqid() . '.' . $uploadedImage->guessExtension();

        $this->imageStorage->store($optimizedImage, $filename);
        return $filename;
    }
}