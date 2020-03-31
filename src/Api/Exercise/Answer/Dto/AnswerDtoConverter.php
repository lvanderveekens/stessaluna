<?php 

declare(strict_types=1);

namespace Stessaluna\Api\Exercise\Answer\Dto;

use Stessaluna\Api\Exercise\Answer\Aorb\Dto\AorbAnswerDto;
use Stessaluna\Domain\Exercise\Answer\Aorb\Entity\AorbAnswer;
use Stessaluna\Domain\Exercise\Answer\Entity\Answer;

class AnswerDtoConverter
{
    public function toDto(Answer $answer): AnswerDto
    {
        $dto = null;

        if ($answer instanceof AorbAnswer) {
            $dto = new AorbAnswerDto();
            $dto->choices = $answer->getChoices();
        }

        return $dto;
    }
}
