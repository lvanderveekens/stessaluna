import React, { FC, useState, useEffect } from "react"
import CommentInterface from "../comment.interface"
import CommentSection from "./CommentSection"
import { addComment, deleteComment } from "../../../store/post/actions"
import { State } from "../../../store/configureStore"
import { connect } from "react-redux"
import User from "../../../user/user.interface"

interface Props {
  postId: number
  comments: CommentInterface[]
  showAll: boolean
  setShowAll: (showAll: boolean) => void
  numberOfPreviewComments: number
  setNumberOfPreviewComments: (count: number) => void
  user: User
  addComment: (postId: number, text: string) => Promise<void>
  deleteComment: (postId: number, commentId: number) => void
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
}) => {
  useEffect(() => {
    if (comments.length == numberOfPreviewComments) {
      setShowAll(true)
    }
  }, [])

  const handleAddComment = (text: string) => {
    addComment(postId, text).then(() => setNumberOfPreviewComments(numberOfPreviewComments + 1))
  }

  const handleDeleteComment = (commentId: number) => {
    deleteComment(postId, commentId)
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
