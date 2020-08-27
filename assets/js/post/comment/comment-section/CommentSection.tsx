import React, {FunctionComponent} from "react"
import User from "../../../user/user.interface"
import Comment from "../Comment"
import NewCommentForm from "../new-comment-form/NewCommentForm"
import styles from "./CommentSection.scss?module"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLock} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"

interface Props {
  commentIds: number[]
  numberOfPreviewComments: number
  showAll: boolean
  setShowAll: (showAll: boolean) => void
  user?: User
  addComment: (text: string) => Promise<void>
  deleteComment: (id: number) => void
  locked: boolean,
  loggedIn: boolean,
}

const CommentSection: FunctionComponent<Props> = (
  {
    commentIds,
    numberOfPreviewComments,
    showAll,
    setShowAll,
    user,
    addComment,
    deleteComment,
    locked,
    loggedIn,
  }
) => {
  return (
    <div className={styles.commentSection}>
      {locked && (
        <div className={styles.locked}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faLock} />
          </span>
          Locked until answered
        </div>
      )}
      {!locked && (
        <>
          {!showAll && (
            <div className={styles.showAll}>
              <div className={styles.button} onClick={() => setShowAll(true)}>
                Show all
              </div>
            </div>
          )}
          {commentIds
            .sort((id, other) => id - other)
            .slice(showAll ? 0 : commentIds.length - numberOfPreviewComments)
            .map((id) => (
              <Comment key={id} id={id} onDelete={() => deleteComment(id)}/>
            ))}
          {!loggedIn && (
            <div className={styles.loginSignupLinkWrapper}>
              <Link to="/login">Log in or sign up to add comments</Link>
            </div>
          )}
          {user && <NewCommentForm onSubmit={addComment} avatar={user.avatar.url}/>}
        </>
      )}
    </div>
  )
}

export default CommentSection
