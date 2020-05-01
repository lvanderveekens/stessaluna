<?php

declare(strict_types=1);

namespace Stessaluna\Post\Dto;

use Stessaluna\Exercise\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Exercise\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Exercise\Aorb\Dto\CreateAorbExercise;
use Stessaluna\Exercise\Dto\CreateExercise;
use Stessaluna\Exercise\ExerciseType;
use Stessaluna\Exercise\Missingword\Dto\CreateMissingwordExercise;
use Stessaluna\Exercise\Whatdoyousee\Dto\CreateWhatdoyouseeExercise;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RequestToCreatePostConverter
{
    public static function convert(Request $request): CreatePost
    {
        $createPost = new CreatePost();
        $createPost->text = $request->get('text');
        $createPost->image = $request->files->get('image');
        if ($request->get('exercise')) {
            $createPost->exercise = self::toCreateExercise($request->get('exercise'), $request->files->get('exercise'));
        }
        return $createPost;
    }

    /**
     * @param array $exercise
     * @param null|array|UploadedFile[] $exerciseFiles
     */
    private static function toCreateExercise(array $exercise, ?array $exerciseFiles): CreateExercise
    {
        $createExercise = null;
        $type = $exercise['type'];
        switch ($type) {
            case ExerciseType::A_OR_B:
                $createExercise = self::toCreateAorbExercise($exercise);
                break;
            case ExerciseType::WHAT_DO_YOU_SEE:
                $createExercise = self::toCreateWhatdoyouseeExercise($exercise, $exerciseFiles);
                break;
            case ExerciseType::MISSING_WORD:
                $createExercise = self::toCreateMissingwordExercise($exercise);
                break;
            default:
                throw new BadRequestHttpException("Unsupported exercise type: $type");
        }
        return $createExercise;
    }

    private static function toCreateAorbExercise(array $exercise): CreateAorbExercise
    {
        $createAorbExercise = new CreateAorbExercise();

        $sentences = array();
        foreach ($exercise['sentences'] as $sentenceParameter) {
            $sentence = new AorbSentenceDto();
            $sentence->textBefore = $sentenceParameter['textBefore'];

            $choice = new AorbChoiceDto();
            $choice->a = $sentenceParameter['choice']['a'];
            $choice->b = $sentenceParameter['choice']['b'];
            $choice->correct = $sentenceParameter['choice']['correct'];
            $sentence->choice = $choice;

            $sentence->textAfter = $sentenceParameter['textAfter'];
            array_push($sentences, $sentence);
        }

        $createAorbExercise->sentences = $sentences;
        return $createAorbExercise;
    }

    private static function toCreateWhatdoyouseeExercise(
        array $exercise,
        array $exerciseFiles
    ): CreateWhatdoyouseeExercise {
        $createExercise = new CreateWhatdoyouseeExercise();

        $createExercise->image = $exerciseFiles['image'];
        $createExercise->option1 = $exercise['option1'];
        $createExercise->option2 = $exercise['option2'];
        $createExercise->option3 = $exercise['option3'];
        $createExercise->option4 = $exercise['option4'];
        $createExercise->correct = (int) $exercise['correct'];

        return $createExercise;
    }

    private static function toCreateMissingwordExercise(array $exercise): CreateMissingwordExercise
    {
        $createExercise = new CreateMissingwordExercise();

        $createExercise->textBefore = $exercise['textBefore'];
        $createExercise->textAfter = $exercise['textAfter'];
        $createExercise->option1 = $exercise['option1'];
        $createExercise->option2 = $exercise['option2'];
        $createExercise->option3 = $exercise['option3'];
        $createExercise->option4 = $exercise['option4'];
        $createExercise->correct = (int) $exercise['correct'];

        return $createExercise;
    }
}