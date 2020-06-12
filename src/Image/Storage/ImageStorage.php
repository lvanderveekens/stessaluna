<?php declare(strict_types=1);

namespace Stessaluna\Image\Storage;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface ImageStorage {

    /**
     * Get the path to the image.
     * @return string the path
     */
    public function getPath(string $filename): string;

    /**
     * Store an uploaded image and return the filename.
     * @return string the filename
     */
    public function store(UploadedFile $image): string;

    /**
     * Delete an image by filename.
     */
    public function delete(string $filename);
}
