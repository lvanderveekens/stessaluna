<?php

declare(strict_types=1);

namespace Stessaluna\Image;

use Exception;
use Intervention\Image\ImageManagerStatic as Image;
use Psr\Log\LoggerInterface;
use Spatie\ImageOptimizer\OptimizerChainFactory;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\KernelInterface;

class ImageStorage
{
    private static string $PUBLIC_PATH = '/uploads/images';

    private string $directory;
    private LoggerInterface $logger;

    public function __construct(KernelInterface $kernel, LoggerInterface $logger)
    {
        $this->directory = $kernel->getProjectDir().'/public'.self::$PUBLIC_PATH;
        $this->logger = $logger;
    }

    /**
     * @return string the relative path to the image.
     */
    public function getRelativePath(string $filename): string
    {
        return self::$PUBLIC_PATH.'/'.$filename;
    }

    /**
     * @return string the filename of the stored image.
     */
    public function store(UploadedFile $image): string
    {
        $originalFilename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
        // this is needed to safely include the filename as part of the URL
        $safeFilename = transliterator_transliterate(
            'Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()',
            $originalFilename
        );
        $filename = $safeFilename.'-'.uniqid().'.'.$image->guessExtension();

        try {
            $imageFile = $image->move($this->directory, $filename);
            $this->fixOrientation($imageFile);
            $this->optimize($imageFile);
        } catch (FileException $e) {
            $this->logger->error($e);
        }
        return $filename;
    }

    public function delete(string $filename)
    {
        try {
            unlink($this->directory.'/'.$filename);
        } catch (Exception $e) {
            $this->logger->error($e);
        }
    }

    private function fixOrientation(File $imageFile)
    {
        $image = Image::make($imageFile->getPathname());
        $image->orientate();
        $image->save($imageFile->getPathname());
    }

    private function optimize(File $imageFile)
    {
        $optimizerChain = OptimizerChainFactory::create();
        $optimizerChain
                ->useLogger($this->logger)
                ->optimize($imageFile->getPathname());
    }
}