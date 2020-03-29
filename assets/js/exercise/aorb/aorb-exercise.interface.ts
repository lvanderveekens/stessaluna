import { AbstractExercise } from "../exercise.interface";

export interface AorbExercise extends AbstractExercise {
    type: 'aorb'
    sentences: AorbSentence[]
}

export interface AorbSentence {
    textBefore: string
    choice: AorbChoice
    textAfter: string
}

export interface AorbChoice {
    a: string
    b: string
}

export default AorbExercise;