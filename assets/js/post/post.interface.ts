import User from "../user/user.interface"
import Comment from "./comment/comment.interface"
import Exercise from "../exercise/exercise.model"

export interface Post {
  id: number
  type: string
  createdAt: Date
  author: User
  channel: string
  text?: string
  image?: string
  exercise?: Exercise
  comments: Comment[]
}

export default Post
