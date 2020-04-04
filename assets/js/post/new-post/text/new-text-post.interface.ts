import { NewPost } from "../new-post.interface"

export class NewTextPost implements NewPost {
    type = 'text'
    text: string
    image: File

    constructor(text: string, image: File) {
        this.text = text;
        this.image = image;
    }
};