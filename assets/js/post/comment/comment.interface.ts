import User from "../../user/user.interface";

interface Comment {
    id: number
    createdAt: string
    text: string
    user: User
}

export default Comment;