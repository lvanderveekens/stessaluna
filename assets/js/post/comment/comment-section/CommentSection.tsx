import moment from "moment"
import React, { FunctionComponent } from "react"
import User from "../../../user/user.interface"
import Comment from "../Comment"
import CommentInterface from "../comment.interface"
import NewCommentForm from "../new-comment-form/NewCommentForm"
import styles from "./CommentSection.scss?module"

interface Props {
  comments: CommentInterface[]
  numberOfPreviewComments: number
  showAll: boolean
  setShowAll: (showAll: boolean) => void
  user: User
  addComment: (text: string) => Promise<void>
  deleteComment: (id: number) => void
  locked: boolean
}

const CommentSection: FunctionComponent<Props> = ({
  comments,
  numberOfPreviewComments,
  showAll,
  setShowAll,
  user,
  addComment,
  deleteComment,
  locked,
}) => {
  if (locked) {
    return <div className={styles.commentSection}>Locked!!!</div>
  }
  return (
    <div className={styles.commentSection}>
      {!showAll && (
        <div className={styles.showAll}>
          <div className={styles.button} onClick={() => setShowAll(true)}>
            Show all
          </div>
        </div>
      )}
      {comments
        .sort((comment, other) => new Date(comment.createdAt).getTime() - new Date(other.createdAt).getTime())
        .slice(showAll ? 0 : comments.length - numberOfPreviewComments)
        .map((comment) => (
          <Comment
            key={comment.id}
            timestamp={moment(comment.createdAt).fromNow()}
            author={comment.user}
            user={user}
            text={comment.text}
            onDelete={() => deleteComment(comment.id)}
          />
        ))}
      <NewCommentForm onSubmit={addComment} avatar={user.avatar} />
    </div>
  )
}

export default CommentSection
