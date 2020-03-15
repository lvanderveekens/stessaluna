<?php

namespace App\Service;

use Psr\Log\LoggerInterface;
use Spatie\ImageOptimizer\OptimizerChainFactory;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function upload(UploadedFile $file, string $targetDirectory)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        // this is needed to safely include the file name as part of the URL
        $safeFilename = transliterator_transliterate(
            'Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()',
            $originalFilename
        );
        $filename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        try {
            $newFile = $file->move($targetDirectory, $filename);

            $optimizerChain = OptimizerChainFactory::create();
            $optimizerChain
                ->useLogger($this->logger)
                ->optimize($newFile->getPathname());
        } catch (FileException $e) {
            $this->logger->error($e);
        }
        return $filename;
    }
}
