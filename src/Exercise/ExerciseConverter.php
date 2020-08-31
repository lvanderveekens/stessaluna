<?php

declare(strict_types=1);

namespace Stessaluna\Exercise;

use Stessaluna\Exercise\Aorb\AorbExerciseConverter;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Dto\ExerciseDto;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\Missingword\Entity\MissingwordExercise;
use Stessaluna\Exercise\Missingword\MissingwordExerciseConverter;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Exercise\Whatdoyousee\WhatdoyouseeExerciseConverter;
use Stessaluna\Image\Dto\ImageToImageDtoMapper;
use Stessaluna\User\Entity\User;

class ExerciseConverter
{
    /** @var ImageToImageDtoMapper */
    private $imageToImageDtoMapper;

    /**  @var ExerciseService */
    private $exerciseService;

    /** @var AorbExerciseConverter */
    private $aorbExerciseConverter;

    /** @var WhatdoyouseeExerciseConverter */
    private $whatdoyouseeExerciseConverter;

    /** @var MissingwordExerciseConverter */
    private $missingwordExerciseConverter;

    public function __construct(
        ImageToImageDtoMapper $imageToImageDtoMapper,
        ExerciseService $exerciseService,
        AorbExerciseConverter $aorbExerciseConverter,
        WhatdoyouseeExerciseConverter $whatdoyouseeExerciseConverter,
        MissingwordExerciseConverter $missingwordExerciseConverter
    )
    {
        $this->imageToImageDtoMapper = $imageToImageDtoMapper;
        $this->exerciseService = $exerciseService;
        $this->aorbExerciseConverter = $aorbExerciseConverter;
        $this->whatdoyouseeExerciseConverter = $whatdoyouseeExerciseConverter;
        $this->missingwordExerciseConverter = $missingwordExerciseConverter;
    }

    public function toDto(Exercise $exercise, ?User $user): ExerciseDto
    {
        $dto = null;

        if ($exercise instanceof AorbExercise) {
            $dto = $this->aorbExerciseConverter->toDto($exercise, $user);
        } elseif ($exercise instanceof WhatdoyouseeExercise) {
            $dto = $this->whatdoyouseeExerciseConverter->toDto($exercise, $user);
        } elseif ($exercise instanceof MissingwordExercise) {
            $dto = $this->missingwordExerciseConverter->toDto($exercise, $user);
        }

        $dto->id = $exercise->getId();
        $dto->answerCount = count($exercise->getAnswers()->toArray());
        return $dto;
    }
}