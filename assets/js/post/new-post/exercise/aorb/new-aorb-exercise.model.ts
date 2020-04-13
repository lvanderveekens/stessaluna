import NewExercise from "../new-exercise.model";
import { AorbSentenceInput } from "./aorb-sentence-input/aorb-sentence-input.model";

export class NewAorbExercise implements NewExercise {
    type: 'aorb'
    sentences: AorbSentenceInput[]

    constructor(sentences: AorbSentenceInput[]) {
        this.sentences = sentences
    }
}