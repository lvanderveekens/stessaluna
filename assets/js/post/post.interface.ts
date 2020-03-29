import User from "../user/user.interface";
import Comment from './comment/comment.interface';

interface Post {
    id: number
    type: string
    createdAt: Date
    author: User
    comments: Comment[]
}

export default Post;