import AorbExercise from "./aorb-exercise/aorb-exercise.model"
import WhatdoyouseeExercise from "./whatdoyousee-exercise/whatdoyousee-exercise.model"
import MissingwordExercise from "./missingword-exercise/missingword-exercise.model"

type Exercise = AorbExercise | WhatdoyouseeExercise | MissingwordExercise

export interface AbstractExercise {
  id?: number
  type: ExerciseType
  answerCount: number
}

export enum ExerciseType {
  A_OR_B = "aorb",
  WHAT_DO_YOU_SEE = "whatdoyousee",
  MISSING_WORD = "missingword",
}

export default Exercise
