<?php
declare(strict_types=1);

namespace Stessaluna\Image\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Stessaluna\AbstractController;
use Stessaluna\Image\Dto\ImageToImageDtoConverter;
use Stessaluna\Image\ImageService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/images")
 *
 * @IsGranted("ROLE_USER")
 */
class ImageController extends AbstractController
{
    /**
     * @var ImageService
     */
    private $imageService;
    /**
     * @var ImageToImageDtoConverter
     */
    private $imageToImageDtoConverter;

    public function __construct(ImageService $imageService, ImageToImageDtoConverter $imageToImageDtoConverter)
    {
        $this->imageService = $imageService;
        $this->imageToImageDtoConverter = $imageToImageDtoConverter;
    }

    /**
     * @Route(methods={"POST"})
     */
    public function storeImage(Request $request): JsonResponse
    {
        $uploadedImage = $request->files->get('image');
        $image = $this->imageService->store($uploadedImage);
        return $this->json($this->imageToImageDtoConverter->convert($image));
    }
}

