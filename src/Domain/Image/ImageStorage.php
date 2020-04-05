<?php

declare(strict_types=1);

namespace Stessaluna\Domain\Image;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface ImageStorage
{
    function getRelativeUrl(string $filename): string;

    /** @return string the filename */
    function store(UploadedFile $image): string;

    function delete(string $filename);
}