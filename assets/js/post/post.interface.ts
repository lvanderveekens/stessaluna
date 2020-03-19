import User from "../user/user.interface";
import Comment from './comment/comment.interface';


type Post = AorbPost | TextPost;

interface AbstractPost {
    id: number
    createdAt: Date
    user: User
    avatar: string
    comments: Comment[]
}

// TODO: move to own classes
export interface AorbPost extends AbstractPost {
    type: 'aorb'
    sentences: AorbSentence[]
}

export interface TextPost extends AbstractPost {
    type: 'text'
    text: "aap"
}

export interface AorbSentence {
    textBefore: string
    choice: AorbChoice
    textAfter: string
}

export interface AorbChoice {
    a: string
    b: string
}

export default Post;