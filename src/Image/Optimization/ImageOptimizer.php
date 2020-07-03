<?php
declare(strict_types=1);


namespace Stessaluna\Image\Optimization;


use Intervention\Image\ImageManagerStatic as Image;
use Psr\Log\LoggerInterface;
use Spatie\ImageOptimizer\OptimizerChainFactory;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageOptimizer
{
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function optimize(UploadedFile $image): File
    {
        // in AppEngine we can only write to the temp directory
        $imageFile = $image->move(sys_get_temp_dir());

        $image = Image::make($imageFile->getPathname());
        $image->orientate();
        $image->save($imageFile->getPathname());

        $optimizerChain = OptimizerChainFactory::create();
        $optimizerChain
            ->useLogger($this->logger)
            ->optimize($imageFile->getPathname());

        return $imageFile;
    }
}