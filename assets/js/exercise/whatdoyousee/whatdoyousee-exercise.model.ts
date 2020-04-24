import { AbstractExercise, ExerciseType } from "../exercise.model"

export interface WhatdoyouseeExercise extends AbstractExercise {
  type: ExerciseType.WHAT_DO_YOU_SEE

  image: string
  option1: string
  option2: string
  option3: string
  option4: string

  correct: number
  answer?: number
}

export default WhatdoyouseeExercise
