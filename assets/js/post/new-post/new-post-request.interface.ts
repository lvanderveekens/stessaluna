import { AorbSentence } from "../post.interface";

export interface NewPostRequest {
    type: string
}

export class NewAorbPostRequest implements NewPostRequest {
    type = 'aorb'
    sentences: AorbSentence[]

    constructor(sentences: AorbSentence[]) {
        this.sentences = sentences;
    }
}