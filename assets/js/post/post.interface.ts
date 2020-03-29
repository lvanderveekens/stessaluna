import User from "../user/user.interface";
import Comment from './comment/comment.interface';
import TextPost from "./text/text-exercise.interface";
import ExercisePost from "./exercise/exercise-post.interface";

type Post = TextPost | ExercisePost;

export interface AbstractPost {
    id: number
    type: string
    createdAt: Date
    author: User
    comments: Comment[]
}

export default Post;