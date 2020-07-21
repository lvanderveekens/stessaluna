<?php


namespace Stessaluna\Exercise\Dto;


use RuntimeException;
use Stessaluna\Exercise\Aorb\Dto\AorbExerciseDto;
use Stessaluna\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Exercise\Aorb\Entity\AorbChoice;
use Stessaluna\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Exercise\Entity\Exercise;
use Stessaluna\Exercise\Missingword\Dto\MissingwordExerciseDto;
use Stessaluna\Exercise\Missingword\Entity\MissingwordExercise;
use Stessaluna\Exercise\Whatdoyousee\Dto\WhatdoyouseeExerciseDto;
use Stessaluna\Exercise\Whatdoyousee\Entity\WhatdoyouseeExercise;
use Stessaluna\Image\Repository\ImageRepository;

class ExerciseDtoToExerciseConverter
{
    /**
     * @var ImageRepository
     */
    private $imageRepository;

    public function __construct(ImageRepository $imageRepository)
    {
        $this->imageRepository = $imageRepository;
    }

    public function convert(?ExerciseDto $dto): ?Exercise
    {
        if ($dto == null) {
            return null;
        }
        $exercise = null;
        if ($dto instanceof AorbExerciseDto) {
            $exercise = $this->convertToAorbExercise($dto);
        } elseif ($dto instanceof WhatdoyouseeExerciseDto) {
            $exercise = $this->convertToWhatdoyouseeExercise($dto);
        } elseif ($dto instanceof MissingwordExerciseDto) {
            $exercise = $this->convertToMissingwordExercise($dto);
        } else {
            throw new RuntimeException('Unsupported create exercise class: ' . get_class($dto));
        }
        return $exercise;
    }

    private function convertToAorbExercise(AorbExerciseDto $dto): AorbExercise
    {
        $exercise = new AorbExercise();
        $exercise->setSentences(array_map(function (AorbSentenceDto $sentenceDto) {
            $sentence = new AorbSentence();
            $sentence->textBefore = $sentenceDto->textBefore;

            $choice = new AorbChoice();
            $choice->a = $sentenceDto->choice->a;
            $choice->b = $sentenceDto->choice->b;
            $choice->correct = $sentenceDto->choice->correct;
            $sentence->choice = $choice;

            $sentence->textAfter = $sentenceDto->textAfter;
            return $sentence;
        }, $dto->sentences));
        return $exercise;
    }

    private function convertToWhatdoyouseeExercise(WhatdoyouseeExerciseDto $dto): WhatdoyouseeExercise
    {
        $exercise = new WhatdoyouseeExercise();
        $exercise->setImage($this->imageRepository->getReference($dto->image->id));
        $exercise->setOption1($dto->option1);
        $exercise->setOption2($dto->option2);
        $exercise->setOption3($dto->option3);
        $exercise->setOption4($dto->option4);
        $exercise->setCorrect($dto->correct);
        return $exercise;
    }

    private function convertToMissingwordExercise(MissingwordExerciseDto $dto): MissingwordExercise
    {
        $exercise = new MissingwordExercise();
        $exercise->setTextBefore($dto->textBefore);
        $exercise->setTextAfter($dto->textAfter);
        $exercise->setOption1($dto->option1);
        $exercise->setOption2($dto->option2);
        $exercise->setOption3($dto->option3);
        $exercise->setOption4($dto->option4);
        $exercise->setCorrect($dto->correct);
        return $exercise;
    }
}