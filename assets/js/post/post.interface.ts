import User from "../user/user.interface";
import Comment from './comment/comment.interface';

type Post = ExercisePost | TextPost;

interface AbstractPost {
    id: number
    createdAt: Date
    user: User
    avatar: string
    comments: Comment[]
}

// TODO: move to own files?
export interface ExercisePost extends AbstractPost {
    type: 'exercise'
    exercise: Exercise
}

export interface TextPost extends AbstractPost {
    type: 'text'
    text: "aap"
}

type Exercise = AorbExercixe

export interface AorbExercixe {
    type: 'aorb'
    sentences: AorbSentence[]
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