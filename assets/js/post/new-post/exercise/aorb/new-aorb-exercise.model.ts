import NewExercise from "../new-exercise.model";
import { AorbSentenceInput } from "./aorb-sentence-input/aorb-sentence-input.model";

export interface NewAorbExercise extends NewExercise {
    type: 'aorb'
    sentences: AorbSentenceInput[]
}