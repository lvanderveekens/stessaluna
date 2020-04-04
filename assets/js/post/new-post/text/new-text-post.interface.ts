import { NewPost } from "../new-post.interface"

export class NewTextPost implements NewPost {
    type = 'text'
    text: string

    constructor(text: string) {
        this.text = text;
    }
};