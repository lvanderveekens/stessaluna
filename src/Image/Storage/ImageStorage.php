<?php declare(strict_types=1);

namespace Stessaluna\Image\Storage;

use Symfony\Component\HttpFoundation\File\File;

interface ImageStorage {

    /**
     * Get the URL to the image.
     * @return string the url
     */
    public function getUrl(string $filename): string;

    /**
     * Store an uploaded image.
     */
    public function store(File $image, string $filename);

    /**
     * Delete an image by filename.
     */
    public function delete(string $filename);
}
