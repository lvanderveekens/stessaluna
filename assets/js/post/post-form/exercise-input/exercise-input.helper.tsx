import ExerciseInputValues from "./exercise-input.model";
import {ExerciseType} from "../../../exercise/exercise.model";
import AorbExerciseInputValues from "./aorb-exercise-input/aorb-exercise-input.model";
import AorbExerciseInput from "./aorb-exercise-input/AorbExerciseInput";
import WhatdoyouseeExerciseInputValues from "./whatdoyousee-exercise-input/whatdoyousee-exercise-input.model";
import WhatdoyouseeExerciseInput from "./whatdoyousee-exercise-input/WhatdoyouseeExerciseInput";
import MissingwordExerciseInputValues from "./missingword-exercise-input/missingword-exercise-input.model";
import MissingwordExerciseInput from "./missingword-exercise-input/MissingwordExerciseInput";
import React from "react";

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

