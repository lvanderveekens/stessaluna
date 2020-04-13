import AorbExercise from "./aorb/aorb-exercise.model";

type Exercise = AorbExercise

export interface AbstractExercise {
    id?: number
    type: string
}

export default Exercise;