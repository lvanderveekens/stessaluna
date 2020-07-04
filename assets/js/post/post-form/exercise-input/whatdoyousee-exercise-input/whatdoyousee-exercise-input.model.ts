import ExerciseInputValues from "../exercise-input.model"
import {ExerciseType} from "../../../../exercise/exercise.model"
import Image from "../../../../image/image.interface";

export class WhatdoyouseeExerciseInputValues extends ExerciseInputValues {
  image?: Image
  option1?: string
  option2?: string
  option3?: string
  option4?: string
  correct?: number

  constructor(image?: Image, option1?: string, option2?: string, option3?: string, option4?: string, correct?: number) {
    super(ExerciseType.WHAT_DO_YOU_SEE)
    this.image = image
    this.option1 = option1
    this.option2 = option2
    this.option3 = option3
    this.option4 = option4
    this.correct = correct
  }
}

export default WhatdoyouseeExerciseInputValues
