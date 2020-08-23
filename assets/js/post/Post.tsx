import React, {FC, useEffect, useState} from "react"
import {connect} from "react-redux"
import {isAnswered} from "../exercise/exercise.helper"
import ExerciseInterface from "../exercise/exercise.interface"
import User from "../user/user.interface"
import CommentSection from "./comment/comment-section"
import styles from "./Post.scss?module"
import Text from "./text/Text"
import Comment from "./comment/comment.interface";
import Image from "../image/image.interface";
import Vote from "./vote/vote.interface";
import PostHeader from "./post-header/PostHeader";
import PostToolbar from "./post-toolbar/PostToolbar";
import Exercise from "../exercise/Exercise";

interface Props {
  id: number
  author: User
  createdAt: string
  edited: boolean
  channel: string
  text?: string
  image?: Image
  exercise?: ExerciseInterface
  comments: Comment[]
  votes: Vote[]
  user?: User,
}

const Post: FC<Props> = (
  {
    id,
    author,
    createdAt,
    edited,
    channel,
    text,
    image,
    exercise,
    comments,
    votes,
    user,
  }) => {
  const [showComments, setShowComments] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)
  const [numberOfPreviewComments, setNumberOfPreviewComments] = useState(1)

  const isAuthor = (user?: User) => user && user.id == author.id
  const isCommentSectionLocked = exercise && !isAnswered(exercise) && !isAuthor(user)

  useEffect(() => {
    if (comments.length > 0) {
      toggleComments()
    }
  }, [])

  const toggleComments = () => setShowComments(!showComments)

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <PostHeader author={author} channel={channel} createdAt={createdAt} edited={edited}/>
        {text && <Text text={text}/>}
        {image && (
          <div className={styles.imageWrapper}>
            <div className={styles.aspectRatioBox}>
              <img src={image.url} alt="Post image"/>
            </div>
          </div>
        )}
        {exercise && (<Exercise {...exercise} disabled={isAuthor(user)}/>)}
      </div>
      <PostToolbar
        postId={id}
        author={author}
        votes={votes}
        commentCount={comments.length}
        toggleComments={toggleComments}
      />
      {showComments && (
        <CommentSection
          postId={id}
          comments={comments}
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, null)(Post)
