import AorbExercise from "./aorb/aorb.model";

type Exercise = AorbExercise

export interface AbstractExercise {
    id?: number
    type: ExerciseType
}

export enum ExerciseType {
    AORB = 'aorb'
}

export default Exercise;