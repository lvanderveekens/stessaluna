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
    private static $PUBLIC_PATH = '/uploads/images';

    /** @var string */
    private $directory;

    /** @var LoggerInterface */
    private $logger;

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

        $bucketName = "stessaluna-bucket-public";

        $fileContent = file_get_contents($image->getPathname());

        // NOTE: if 'folder' or 'tree' is not exist then it will be automatically created !
        $cloudPath = 'uploads/images/' . $filename;

//        $privateKeyFileContent = $GLOBALS['privateKeyFileContent'];

        // connect to Google Cloud Storage using private key as authentication

        $storage = new StorageClient([
            'projectId' => 'stessaluna'
            // not required, because it implicitly uses the app engine's default service account
//            'keyFile' => json_decode($privateKeyFileContent, true)
        ]);

        // set which bucket to work in
        $bucket = $storage->bucket($bucketName);

        // TODO: compress before upload?

        // upload/replace file
        $storageObject = $bucket->upload(
            $fileContent,
            ['name' => $cloudPath]
        // if $cloudPath is existed then will be overwrite without confirmation
        // NOTE:
        // a. do not put prefix '/', '/' is a separate folder name  !!
        // b. private key MUST have 'storage.objects.delete' permission if want to replace file !
        );

        // TODO: did it succeed ?
//        return $storageObject != null;

//        $originalFilename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
//        // this is needed to safely include the filename as part of the URL
//        $safeFilename = transliterator_transliterate(
//            'Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()',
//            $originalFilename
//        );
//        $filename = $safeFilename.'-'.uniqid().'.'.$image->guessExtension();
//
//        try {
//            $imageFile = $image->move($this->directory, $filename);
//            $this->fixOrientation($imageFile);
//            $this->optimize($imageFile);
//        } catch (FileException $e) {
//            $this->logger->error($e);
//        }
//        return $filename;
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