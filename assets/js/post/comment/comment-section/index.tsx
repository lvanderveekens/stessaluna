import React, {FC, useEffect} from "react"
import {connect} from "react-redux"
import {State} from "../../../store"
import User from "../../../user/user.interface"
import CommentSection from "./CommentSection"
import {addComment, deleteComment} from "../state/comment.actions";

interface Props {
  postId: number
  commentIds: number[]
  showAll: boolean
  setShowAll: (showAll: boolean) => void
  numberOfPreviewComments: number
  setNumberOfPreviewComments: (count: number) => void
  user?: User
  addComment: (postId: number, text: string) => Promise<void>
  deleteComment: (postId: number, commentId: number) => Promise<void>
  locked: boolean
  loggedIn: boolean
}

const CommentSectionContainer: FC<Props> = ({
  postId,
  commentIds,
  showAll,
  setShowAll,
  numberOfPreviewComments,
  setNumberOfPreviewComments,
  user,
  addComment,
  deleteComment,
  locked,
  loggedIn
}) => {
  useEffect(() => {
    if (commentIds.length <= numberOfPreviewComments) {
      setShowAll(true)
    }
  }, [commentIds])

  const handleAddComment = (text: string) => {
    return addComment(postId, text)
      .then(() => {
        setNumberOfPreviewComments(numberOfPreviewComments + 1)
      })

  }

  const handleDeleteComment = (commentId: number) => {
    deleteComment(postId, commentId)
      .then(() => {
        setNumberOfPreviewComments(Math.max(numberOfPreviewComments - 1, 1))
      })
  }

  return (
    <CommentSection
      commentIds={commentIds}
      numberOfPreviewComments={numberOfPreviewComments}
      showAll={showAll}
      setShowAll={setShowAll}
      user={user}
      addComment={handleAddComment}
      deleteComment={handleDeleteComment}
      locked={locked}
      loggedIn={loggedIn}
    />
  )
}

const mapStateToProps = (state: State) => ({
  user: state.auth.userId && state.entities.usersById[state.auth.userId],
  loggedIn: state.auth.loggedIn,
})

const actionCreators = {
  addComment,
  deleteComment,
}

export default connect(mapStateToProps, actionCreators)(CommentSectionContainer)
