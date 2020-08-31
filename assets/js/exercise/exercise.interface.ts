import AorbExercise from "./aorb-exercise-content/aorb-exercise.interface"
import WhatdoyouseeExercise from "./whatdoyousee-exercise-content/whatdoyousee-exercise.interface"
import MissingwordExercise from "./missingword-exercise-content/missingword-exercise.interface"

type Exercise = AorbExercise | WhatdoyouseeExercise | MissingwordExercise

export interface AbstractExercise {
  id: number
  type: ExerciseType
  answerCount: number
  correctAnswersPercentage: number
}

export enum ExerciseType {
  A_OR_B = "aorb",
  WHAT_DO_YOU_SEE = "whatdoyousee",
  MISSING_WORD = "missingword",
}

export default Exercise
