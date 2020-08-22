import User from "../user/user.interface"
import Comment from "./comment/comment.interface"
import Exercise from "../exercise/exercise.interface"
import Image from "../image/image.interface";
import Vote from "./vote/vote.interface";

export interface Post {
  id: number
  type: string
  createdAt: Date
  modifiedAt: Date
  author: User
  channel: string
  text?: string
  image?: Image
  votes: Vote[]
  exercise?: Exercise
  comments: Comment[]
}

export default Post
