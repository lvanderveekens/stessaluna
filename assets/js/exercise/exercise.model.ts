import AorbExercise from "./aorb/aorb-exercise.model";

type Exercise = AorbExercise

export interface AbstractExercise {
    id?: number
    type: ExerciseType
}

export enum ExerciseType {
    A_OR_B = 'aorb',
    WHAT_DO_YOU_SEE = 'whatdoyousee',
}

export default Exercise;