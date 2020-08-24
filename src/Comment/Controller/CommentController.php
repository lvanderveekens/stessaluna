<?php
declare(strict_types=1);

namespace Stessaluna\Comment\Controller;

use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Stessaluna\AbstractController;
use Stessaluna\Comment\CommentService;
use Stessaluna\Comment\Dto\AddCommentRequest;
use Stessaluna\Comment\Dto\CommentToCommentDtoMapper;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/comments")
 *
 * @IsGranted("IS_AUTHENTICATED_ANONYMOUSLY")
 */
class CommentController extends AbstractController
{
    /** @var CommentService */
    private $commentService;

    /** @var CommentToCommentDtoMapper */
    private $commentToCommentDtoMapper;

    /** @var LoggerInterface */
    private $logger;

    public function __construct(
        CommentService $commentService,
        CommentToCommentDtoMapper $commentToCommentDtoMapper,
        LoggerInterface $logger
    )
    {
        $this->commentService = $commentService;
        $this->commentToCommentDtoMapper = $commentToCommentDtoMapper;
        $this->logger = $logger;
    }

    /**
     * @Route(methods={"POST"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function addComment(Request $request, SerializerInterface $serializer): JsonResponse
    {
        /* @var $addCommentRequest AddCommentRequest */
        $addCommentRequest = $serializer->deserialize($request->getContent(), AddCommentRequest::class, 'json');

        $comment = $this->commentService->addComment(
            $addCommentRequest->postId,
            $addCommentRequest->text,
            $this->getUser()
        );
        return $this->json($this->commentToCommentDtoMapper->map($comment), 201);
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     *
     * @IsGranted("ROLE_USER")
     */
    public function deleteComment(int $id): Response
    {
        $this->commentService->deleteComment($id, $this->getUser());
        return new Response();
    }
}
