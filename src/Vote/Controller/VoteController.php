<?php

declare(strict_types=1);

namespace Stessaluna\Vote\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Stessaluna\AbstractController;
use Stessaluna\Exception\ValidationException;
use Stessaluna\Validation\ValidatorWrapper;
use Stessaluna\Vote\Dto\AddVoteRequest;
use Stessaluna\Vote\Dto\VoteToVoteDtoMapper;
use Stessaluna\Vote\VoteService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/votes")
 *
 * @IsGranted("ROLE_USER")
 */
class VoteController extends AbstractController
{
    /**
     * @var VoteService
     */
    private $voteService;

    /**
     * @var VoteToVoteDtoMapper
     */
    private $voteToVoteDtoMapper;

    public function __construct(VoteService $voteService, VoteToVoteDtoMapper $voteToVoteDtoMapper)
    {
        $this->voteService = $voteService;
        $this->voteToVoteDtoMapper = $voteToVoteDtoMapper;
    }

    /**
     * @Route(methods={"POST"})
     */
    public function addVote(Request $request, ValidatorWrapper $validator): JsonResponse
    {
        /** @var $addVoteRequest AddVoteRequest */
        $addVoteRequest = $this->deserializeJson($request, AddVoteRequest::class);
        $validator->validate($addVoteRequest);

        $vote = $this->voteService->addVote(
            $addVoteRequest->type,
            $addVoteRequest->postId,
            $addVoteRequest->commentId,
            $this->getUser()
        );

        return $this->json($this->voteToVoteDtoMapper->map($vote), 201);
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function deleteVote(int $id): JsonResponse
    {
        // TODO: make idempotent
        $this->voteService->deleteVote($id);
        return new JsonResponse();
    }
}