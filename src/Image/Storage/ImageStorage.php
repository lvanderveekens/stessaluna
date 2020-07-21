<?php declare(strict_types=1);

namespace Stessaluna\Image\Storage;

use Symfony\Component\HttpFoundation\File\File;

interface ImageStorage {

    /**
     * Get the URL to the image.
     * @return string the image url
     */
    public function getUrl(string $filename): string;

    /**
     * Store an uploaded image.
     * @return string the image url
     */
    public function store(File $image, string $filename): string;

    /**
     * Delete an image by filename.
     */
    public function delete(string $filename);
}
