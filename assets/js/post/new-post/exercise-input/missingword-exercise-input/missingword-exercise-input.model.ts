import ExerciseInputValue from "../exercise-input.model"
import { ExerciseType } from "../../../../exercise/exercise.model"

export class MissingwordExerciseInputValue extends ExerciseInputValue {
  textBefore?: string
  textAfter?: string
  option1?: string
  option2?: string
  option3?: string
  option4?: string
  correct?: number

  constructor(
    textBefore?: string,
    textAfter?: string,
    option1?: string,
    option2?: string,
    option3?: string,
    option4?: string,
    correct?: number
  ) {
    super(ExerciseType.MISSING_WORD)
    this.textBefore = textBefore
    this.textAfter = textAfter
    this.option1 = option1
    this.option2 = option2
    this.option3 = option3
    this.option4 = option4
    this.correct = correct
  }
}

export default MissingwordExerciseInputValue
