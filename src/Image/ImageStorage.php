<?php

declare(strict_types=1);

namespace Stessaluna\Image;

use Exception;
use Psr\Log\LoggerInterface;
use Spatie\ImageOptimizer\OptimizerChainFactory;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
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

    public function getRelativeUrl(string $filename): string
    {
        return self::$PUBLIC_PATH.'/'.$filename;
    }

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
            $newFile = $image->move($this->directory, $filename);
            $optimizerChain = OptimizerChainFactory::create();
            $optimizerChain
                ->useLogger($this->logger)
                ->optimize($newFile->getPathname());
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
}