import User from "../../user/user.interface";
import Vote from "../vote/vote.interface";

interface Comment {
    id: number
    createdAt: string
    text: string
    user: User
    votes: Vote[]
}

export default Comment;