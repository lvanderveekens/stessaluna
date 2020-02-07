import User from "../../user/user.interface";

export interface Comment {
    id: number
    createdAt: string
    text: string
    user: User
}