import { NewPostRequest } from "../../new-post.interface";
import { AorbInputValue } from "./aorb-input.interface";
import { NewExercisePostRequest, NewExercise } from "../new-exercise-post.interface";

export class NewAorbPostRequest extends NewExercisePostRequest {

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