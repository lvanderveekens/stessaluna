<?php

declare(strict_types=1);

namespace Stessaluna\Image\Storage\GoogleCloud;

use Exception;
use Google\Cloud\Storage\StorageClient;
use Intervention\Image\ImageManagerStatic as Image;
use Psr\Log\LoggerInterface;
use Spatie\ImageOptimizer\OptimizerChainFactory;
use Stessaluna\Image\Storage\ImageStorage;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\KernelInterface;

class GoogleCloudImageStorage implements ImageStorage
{
    private static $BUCKET_DIRECTORY = 'uploads/images/';

    /** @var LoggerInterface */
    private $logger;

    public function __construct(KernelInterface $kernel, LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function getPath(string $filename): string
    {
        $bucketName = "stessaluna-bucket-public";
        $objectPath = self::$BUCKET_DIRECTORY . $filename;
        return "https://$bucketName.storage.googleapis.com/$objectPath";
    }

    public function store(UploadedFile $image): string
    {
        // TODO: common code, move to abstract parent?

        $originalFilename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
        // this is needed to safely include the filename as part of the URL
        $safeFilename = transliterator_transliterate(
            'Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()',
            $originalFilename
        );
        $filename = $safeFilename.'-'.uniqid().'.'.$image->guessExtension();

        $bucketName = "stessaluna-bucket-public";
        $objectPath = self::$BUCKET_DIRECTORY . $filename;

        $storage = new StorageClient();
        $bucket = $storage->bucket($bucketName);

        // in AppEngine we can only write to the temp directory
        $imageFile = $image->move(sys_get_temp_dir(), $filename);
        $this->fixOrientation($imageFile);
        $this->optimize($imageFile);

        $fileContent = file_get_contents($imageFile->getPathname());
        $bucket->upload($fileContent, ['name' => $objectPath]);

        return $filename;
    }

    public function delete(string $filename)
    {
        $bucketName = "stessaluna-bucket-public";
        $objectPath = self::$BUCKET_DIRECTORY . $filename;

        $storage = new StorageClient();
        $bucket = $storage->bucket($bucketName);
        $storageObject = $bucket->object($objectPath);
        try {
            $storageObject->delete();
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