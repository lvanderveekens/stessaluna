import { AbstractExercise, ExerciseType } from "../exercise.model";

export interface AorbExercise extends AbstractExercise {
    type: ExerciseType.AORB
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
    correct?: 'a' | 'b'
    answer?: 'a' | 'b'
}

export default AorbExercise;