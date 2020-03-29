import { AbstractPost } from '../post.interface';

export interface TextPost extends AbstractPost {
    type: 'text'
    text: string
}

export default TextPost;