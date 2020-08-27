import Image from "../image/image.interface";

export interface Post {
  id: number
  type: string
  createdAt: Date
  modifiedAt: Date
  authorId: number
  channel: string
  text?: string
  image?: Image
  voteIds: number[]
  exerciseId?: number
  commentIds: number[]
}

export default Post
