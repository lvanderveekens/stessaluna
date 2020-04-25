import AorbExercise from "./aorb-exercise/aorb-exercise.model"
import WhatdoyouseeExercise from "./whatdoyousee-exercise/whatdoyousee-exercise.model"

type Exercise = AorbExercise | WhatdoyouseeExercise

export interface AbstractExercise {
  id?: number
  type: ExerciseType
  submitting?: boolean
}

export enum ExerciseType {
  A_OR_B = "aorb",
  WHAT_DO_YOU_SEE = "whatdoyousee",
}

export default Exercise
