import {ExerciseType} from "../exercise.interface"

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

export class MissingwordAnswer implements Answer {
  type = ExerciseType.MISSING_WORD
  option: number

  constructor(option: number) {
    this.option = option
  }
}
