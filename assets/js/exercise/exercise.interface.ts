import AorbExercise from "./aorb/aorb-exercise.interface";

type Exercise = AorbExercise

export interface AbstractExercise {
    id: number
    type: string
}

export default Exercise;