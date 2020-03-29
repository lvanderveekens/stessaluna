import Post from "../post.interface";

export interface TextPost extends Post {
    type: 'text'
    text: string
}

export default TextPost;