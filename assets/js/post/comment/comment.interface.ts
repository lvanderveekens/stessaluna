interface Comment {
    id: number
    createdAt: string
    text: string
    userId: number
    voteIds: number[]
}

export default Comment;