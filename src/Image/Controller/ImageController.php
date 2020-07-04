<?php
declare(strict_types=1);

namespace Stessaluna\Image\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Stessaluna\Image\ImageService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    /**
     * @Route(methods={"POST"})
     */
    public function storeImage(Request $request): JsonResponse
    {
        $uploadedImage = $request->files->get('image');
        $image = $this->imageService->store($uploadedImage);
        return $this->json($image);
    }
}

