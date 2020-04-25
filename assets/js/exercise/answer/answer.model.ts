import { ExerciseType } from "../exercise.model"

export interface Answer {
  type: ExerciseType
}

export class AorbAnswer implements Answer {
  type = ExerciseType.A_OR_B
  choices: ("a" | "b")[]

  constructor(choices: ("a" | "b")[]) {
    this.choices = choices
  }
}

export class WhatdoyouseeAnswer implements Answer {
  type = ExerciseType.WHAT_DO_YOU_SEE
  option: number

  constructor(option: number) {
    this.option = option
  }
}
