import { NewPostRequest } from "../../new-post.interface";
import { AorbInputValue } from "./aorb-input.interface";

export class NewAorbPostRequest implements NewPostRequest {
    type = 'aorb'
    sentences: AorbInputValue[]

    constructor(sentences: AorbInputValue[]) {
        this.sentences = sentences;
    }
}