import { AorbInputValue } from "./aorb-input/aorb-input.interface";
import { NewExercisePost, NewExercise } from "../new-exercise-post.interface";

export class NewAorbPost extends NewExercisePost {

    constructor(sentences: AorbInputValue[]) {
        super()
        this.exercise = new NewAorbExercise(sentences);
    }
}

export class NewAorbExercise implements NewExercise {
    type = 'aorb'
    sentences: AorbInputValue[]

    constructor(sentences: AorbInputValue[]) {
        this.sentences = sentences;
    }
}