<?php

declare(strict_types=1);

namespace Stessaluna\Image\Storage\GoogleCloud;

use Exception;
use Google\Cloud\Storage\StorageClient;
use Psr\Log\LoggerInterface;
use Stessaluna\Image\Storage\ImageStorage;
use Symfony\Component\HttpFoundation\File\File;
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

    public function getUrl(string $filename): string
    {
        $bucketName = "stessaluna-bucket-public";
        $objectPath = self::$BUCKET_DIRECTORY . $filename;
        return "https://storage-download.googleapis.com/$bucketName/$objectPath";
    }

    public function store(File $image, string $filename)
    {
        $storage = new StorageClient();

        $bucketName = "stessaluna-bucket-public";
        $bucket = $storage->bucket($bucketName);

        $objectPath = self::$BUCKET_DIRECTORY . $filename;

        $fileContent = file_get_contents($image->getPathname());
        $bucket->upload($fileContent, ['name' => $objectPath]);
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
}