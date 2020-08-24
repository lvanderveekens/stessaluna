<?php
declare(strict_types=1);

namespace Stessaluna\Image\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Stessaluna\AbstractController;
use Stessaluna\Image\Dto\ImageToImageDtoMapper;
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
     * @var ImageToImageDtoMapper
     */
    private $imageToImageDtoMapper;

    public function __construct(ImageService $imageService, ImageToImageDtoMapper $imageToImageDtoMapper)
    {
        $this->imageService = $imageService;
        $this->imageToImageDtoMapper = $imageToImageDtoMapper;
    }

    /**
     * @Route(methods={"POST"})
     */
    public function storeImage(Request $request): JsonResponse
    {
        $uploadedImage = $request->files->get('image');
        $image = $this->imageService->store($uploadedImage);
        return $this->json($this->imageToImageDtoMapper->map($image));
    }
}

