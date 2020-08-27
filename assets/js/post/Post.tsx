import React, {FC, useEffect, useState} from "react"
import {connect, useSelector} from "react-redux"
import {isAnswered} from "../exercise/exercise.helper"
import User from "../user/user.interface"
import CommentSection from "./comment/comment-section"
import styles from "./Post.scss?module"
import Text from "./text/Text"
import PostHeader from "./post-header/PostHeader";
import PostToolbar from "./post-toolbar/PostToolbar";
import Exercise from "../exercise/Exercise";
import {State} from "../store";
import Post from "./post.interface";

interface OwnProps {
  id: number
}

interface StateProps {
  post: Post
  user?: User,
}

type Props = OwnProps & StateProps

const Post: FC<Props> = ({post, user}) => {

  const {id, authorId, createdAt, modifiedAt, channel, exerciseId, text, image, commentIds, voteIds} = post

  const [showComments, setShowComments] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)
  const [numberOfPreviewComments, setNumberOfPreviewComments] = useState(1)

  const isEdited = createdAt !== modifiedAt
  const isAuthor = (user?: User) => user && user.id == authorId

  const isCommentSectionLocked =
    exerciseId
    && !isAnswered(useSelector((state: State) => state.entities.exercisesById[exerciseId]))
    && !isAuthor(user)


  useEffect(() => {
    if (commentIds.length > 0) {
      toggleComments()
    }
  }, [])

  const toggleComments = () => setShowComments(!showComments)

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <PostHeader authorId={authorId} channel={channel} createdAt={createdAt} edited={isEdited}/>
        {text && <Text text={text}/>}
        {image && (
          <div className={styles.imageWrapper}>
            <div className={styles.aspectRatioBox}>
              <img src={image.url} alt="Post image"/>
            </div>
          </div>
        )}
        {exerciseId && (<Exercise id={exerciseId} disabled={isAuthor(user)}/>)}
      </div>
      <PostToolbar
        postId={id}
        authorId={authorId}
        voteIds={voteIds}
        commentCount={commentIds.length}
        toggleComments={toggleComments}
      />
      {showComments && (
        <CommentSection
          postId={id}
          commentIds={commentIds}
          showAll={showAllComments}
          setShowAll={setShowAllComments}
          numberOfPreviewComments={numberOfPreviewComments}
          setNumberOfPreviewComments={setNumberOfPreviewComments}
          locked={isCommentSectionLocked}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state: State, ownProps: Props) => ({
  post: state.entities.postsById[ownProps.id],
  user: state.auth.userId && state.entities.usersById[state.auth.userId],
})

export default connect<StateProps, {}, OwnProps>(mapStateToProps, null)(Post)
