<?php

namespace Stessaluna\Api\Exercise\Controller;

use Exception;
use Psr\Log\LoggerInterface;
use Stessaluna\Api\Post\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Api\Post\Aorb\Dto\AorbPostDto;
use Stessaluna\Api\Post\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Api\Post\Comment\Dto\CommentConverter;
use Stessaluna\Api\Post\Dto\PostDto;
use Stessaluna\Api\User\Dto\UserConverter;
use Stessaluna\Domain\Post\Aorb\Entity\AorbPost;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Service\PostCreator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/exercises")
 */
class ExerciseController extends AbstractController
{
    private $logger;

    public function __construct(
        LoggerInterface $logger
    ) {
        $this->logger = $logger;
    }

    /**
     * @Route("/{postId}/check", methods={"POST"})
     */
    public function createPost(Request $request): JsonResponse
    {

    }
}