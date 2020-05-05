import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { State } from "../../../store/configureStore"
import { addComment, deleteComment } from "../../../store/post/actions"
import User from "../../../user/user.interface"
import CommentInterface from "../comment.interface"
import CommentSection from "./CommentSection"

interface Props {
  postId: number
  comments: CommentInterface[]
  showAll: boolean
  setShowAll: (showAll: boolean) => void
  numberOfPreviewComments: number
  setNumberOfPreviewComments: (count: number) => void
  user: User
  addComment: (postId: number, text: string) => Promise<void>
  deleteComment: (postId: number, commentId: number) => Promise<void>
  locked: boolean
}

const CommentSectionContainer: FC<Props> = ({
  postId,
  comments,
  showAll,
  setShowAll,
  numberOfPreviewComments,
  setNumberOfPreviewComments,
  user,
  addComment,
  deleteComment,
  locked,
}) => {
  useEffect(() => {
    if (comments.length == numberOfPreviewComments) {
      setShowAll(true)
    }
  }, [comments])

  const handleAddComment = (text: string) => {
    return addComment(postId, text).then(() => setNumberOfPreviewComments(numberOfPreviewComments + 1))
  }

  const handleDeleteComment = (commentId: number) => {
    deleteComment(postId, commentId).then(() => setNumberOfPreviewComments(Math.max(numberOfPreviewComments - 1, 1)))
  }

  return (
    <CommentSection
      comments={comments}
      numberOfPreviewComments={numberOfPreviewComments}
      showAll={showAll}
      setShowAll={setShowAll}
      user={user}
      addComment={handleAddComment}
      deleteComment={handleDeleteComment}
      locked={locked}
    />
  )
}

const actionCreators = {
  addComment,
  deleteComment,
}

const mapStateToProps = (state: State) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, actionCreators)(CommentSectionContainer)
