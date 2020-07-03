<?php
declare(strict_types=1);

namespace Stessaluna\Image\Storage\FileSystem;

use Exception;
use Psr\Log\LoggerInterface;
use Stessaluna\Image\Storage\ImageStorage;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpKernel\KernelInterface;

class FileSystemImageStorage implements ImageStorage
{
    private static $PUBLIC_PATH = '/uploads/images';

    /** @var string */
    private $directory;

    /** @var LoggerInterface */
    private $logger;

    public function __construct(KernelInterface $kernel, LoggerInterface $logger)
    {
        $this->directory = $kernel->getProjectDir() . '/public' . self::$PUBLIC_PATH;
        $this->logger = $logger;
    }

    public function getUrl(string $filename): string
    {
        return self::$PUBLIC_PATH . '/' . $filename;
    }

    public function store(File $image, string $filename)
    {
        try {
            $image->move($this->directory, $filename);
        } catch (FileException $e) {
            $this->logger->error($e);
        }
    }

    public function delete(string $filename)
    {
        try {
            unlink($this->directory . '/' . $filename);
        } catch (Exception $e) {
            $this->logger->error($e);
        }
    }
}