<?php
declare(strict_types=1);

namespace Stessaluna\Vote\Dto;

use Stessaluna\User\Dto\UserToUserDtoMapper;
use Stessaluna\Vote\Entity\Vote;

class VoteToVoteDtoMapper
{
    /** @var UserToUserDtoMapper */
    private $userToUserDtoMapper;

    public function __construct(UserToUserDtoMapper $userToUserDtoMapper)
    {
        $this->userToUserDtoMapper = $userToUserDtoMapper;
    }

    public function map(Vote $vote): VoteDto
    {
        $dto = new VoteDto();
        $dto->id = $vote->getId();
        $dto->type = $vote->getType();
        $dto->user = $this->userToUserDtoMapper->map($vote->getUser());
        return $dto;
    }
}