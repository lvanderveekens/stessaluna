import {AbstractExercise, ExerciseType} from "../exercise.model"

export interface MissingwordExercise extends AbstractExercise {
  type: ExerciseType.MISSING_WORD
  textBefore?: string
  textAfter?: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct: number
  answer?: number
}

export default MissingwordExercise
