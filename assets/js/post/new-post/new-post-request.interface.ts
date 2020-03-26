import { AorbInputValue } from "./exercise/aorb/aorb-input.interface";

export interface NewPostRequest {
    type: string
}

export class NewAorbPostRequest implements NewPostRequest {
    type = 'aorb'
    sentences: AorbInputValue[]

    constructor(sentences: AorbInputValue[]) {
        this.sentences = sentences;
    }
}