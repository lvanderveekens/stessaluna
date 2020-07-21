import ExerciseInputValues from "./exercise-input.model";
import Exercise, {ExerciseType} from "../../../exercise/exercise.model";
import AorbExerciseInputValues from "./aorb-exercise-input/aorb-exercise-input.model";
import AorbExerciseInput from "./aorb-exercise-input/AorbExerciseInput";
import WhatdoyouseeExerciseInputValues from "./whatdoyousee-exercise-input/whatdoyousee-exercise-input.model";
import WhatdoyouseeExerciseInput from "./whatdoyousee-exercise-input/WhatdoyouseeExerciseInput";
import MissingwordExerciseInputValues from "./missingword-exercise-input/missingword-exercise-input.model";
import MissingwordExerciseInput from "./missingword-exercise-input/MissingwordExerciseInput";
import React from "react";
import AorbSentenceInput, {AorbChoiceInput} from "./aorb-exercise-input/aorb-sentence-input/aorb-sentence-input.model";

export const renderExerciseInput = (
  exerciseInputValues: ExerciseInputValues,
  onChange: (change: ExerciseInputValues) => void,
  onClose: () => void
) => {
  const otherProps = {onChange, onClose}

  switch (exerciseInputValues.type) {
    case ExerciseType.A_OR_B: {
      const initialValues = exerciseInputValues as AorbExerciseInputValues
      return <AorbExerciseInput initialValues={initialValues} {...otherProps} />
    }
    case ExerciseType.WHAT_DO_YOU_SEE: {
      const initialValues = exerciseInputValues as WhatdoyouseeExerciseInputValues
      return <WhatdoyouseeExerciseInput initialValues={initialValues} {...otherProps} />
    }
    case ExerciseType.MISSING_WORD: {
      const initialValues = exerciseInputValues as MissingwordExerciseInputValues
      return <MissingwordExerciseInput initialValues={initialValues} {...otherProps} />
    }
    default:
      throw new Error(`Cannot render unsupported exercise type: ${exerciseInputValues.type}`)
  }
}

export const mapToExerciseInput = (exercise: Exercise): ExerciseInputValues => {
  switch (exercise.type) {
    case ExerciseType.A_OR_B:
      const sentences = exercise.sentences.map((sentence) => ({
        textBefore: sentence.textBefore,
        choice: {a: sentence.choice.a, b: sentence.choice.b, correct: sentence.choice.correct} as AorbChoiceInput,
        textAfter: sentence.textAfter
      } as AorbSentenceInput))
      return new AorbExerciseInputValues(sentences)
    case ExerciseType.MISSING_WORD:
      return new MissingwordExerciseInputValues(
        exercise.textBefore,
        exercise.textAfter,
        exercise.option1,
        exercise.option2,
        exercise.option3,
        exercise.option4,
        exercise.correct,
      )
    case ExerciseType.WHAT_DO_YOU_SEE:
      return new WhatdoyouseeExerciseInputValues(
        exercise.image,
        exercise.option1,
        exercise.option2,
        exercise.option3,
        exercise.option4,
        exercise.correct,
      )
    default:
      throw new Error(`Unsupported exercise type: ${(exercise as Exercise).type}`)
  }
}


