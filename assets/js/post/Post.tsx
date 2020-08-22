import {faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {FC, useEffect, useState} from "react"
import {Dropdown} from "react-bootstrap"
import {connect} from "react-redux"
import CustomToggle from "../dropdown/custom-toggle/CustomToggle"
import AorbExercise from "../exercise/aorb-exercise"
import {isAnswered} from "../exercise/exercise.helper"
import Exercise, {ExerciseType} from "../exercise/exercise.model"
import MissingwordExercise from "../exercise/missingword-exercise"
import WhatdoyouseeExercise from "../exercise/whatdoyousee-exercise"
import User from "../user/user.interface"
import CommentSection from "./comment/comment-section"
import styles from "./Post.scss?module"
import Text from "./text/Text"
import Comment from "./comment/comment.interface";
import {Link} from "react-router-dom";
import Image from "../image/image.interface";
import Vote, {VoteType} from "./vote/vote.interface";
import PostHeader from "./post-header/PostHeader";
import {ReactComponent as LikeIcon} from "../../images/icon/like.svg"
import {ReactComponent as DislikeIcon} from "../../images/icon/dislike.svg"
import {ReactComponent as CommentIcon} from "../../images/icon/comment.svg"
import {ReactComponent as AnswerIcon} from "../../images/icon/answer.svg"
import {undoVoteOnPost, updateVoteOnPost, voteOnPost} from "../store/post/actions";
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

interface Props {
  id: number
  author: User
  timestamp: string
  edited: boolean
  channel: string
  text?: string
  image?: Image
  exercise?: Exercise
  onDelete: () => void
  comments: Comment[]
  votes: Vote[]
  user?: User,
  // TODO: refactor..
  voteOnPost: (postId: number, type: VoteType) => Promise<void>
  updateVoteOnPost: (postId: number, voteId: number, type: VoteType) => Promise<void>
  undoVoteOnPost: (postId: number, voteId: number) => Promise<void>
}

const Post: FC<Props> = (
  {
    id,
    author,
    timestamp,
    edited,
    channel,
    text,
    image,
    exercise,
    comments,
    onDelete,
    votes,
    user,
    voteOnPost,
    updateVoteOnPost,
    undoVoteOnPost
  }
) => {
  const [showCommentSection, setShowCommentSection] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)
  const [numberOfPreviewComments, setNumberOfPreviewComments] = useState(1)

  const existingVote = votes.find((vote) => user && user.id == vote.user.id)

  useEffect(() => {
    if (comments.length > 0) {
      toggleCommentSection()
    }
  }, [])

  const toggleCommentSection = () => {
    setShowCommentSection(!showCommentSection)
  }

  const renderExercise = () => {
    const props = {...exercise, disabled: isAuthor(user)}
    switch (exercise.type) {
      case ExerciseType.A_OR_B:
        return <AorbExercise {...props} />
      case ExerciseType.WHAT_DO_YOU_SEE:
        return <WhatdoyouseeExercise {...props} />
      case ExerciseType.MISSING_WORD:
        return <MissingwordExercise {...props} />
    }
  }

  const isAuthor = (user?: User) => user && user.id == author.id

  const isCommentSectionLocked = exercise && !isAnswered(exercise) && !isAuthor(user)

  const vote = (type: VoteType) => {
    // TODO: block for anonymous users
    // TODO: block votes for your own post

    if (existingVote) {
      if (existingVote.type == type) {
        undoVoteOnPost(id, existingVote.id)
      } else {
        updateVoteOnPost(id, existingVote.id, type)
      }
    } else {
      voteOnPost(id, type)
    }
  }

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <PostHeader author={author} channel={channel} timestamp={timestamp} edited={edited}/>
        {text && <Text text={text}/>}
        {image && (
          <div className={styles.imageWrapper}>
            <div className={styles.aspectRatioBox}>
              <img src={image.url} alt="Post image"/>
            </div>
          </div>
        )}
        {exercise && (
          <div className={styles.exerciseWrapper}>
            {renderExercise()}
            <div className={styles.exerciseIcons}>
              <div className={styles.answerIcon}>
                <AnswerIcon/> {exercise.answerCount}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.postIcons}>
        <div className={styles.likeIcon} onClick={() => vote(VoteType.UP)}>
          <LikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.UP})}/>
          {votes.filter((v: Vote) => v.type == VoteType.UP).length}
        </div>
        <div className={styles.dislikeIcon} onClick={() => vote(VoteType.DOWN)}>
          <DislikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.DOWN})}/>
          {votes.filter((v: Vote) => v.type == VoteType.DOWN).length}
        </div>
        <div className={styles.commentIcon} onClick={toggleCommentSection}>
          <CommentIcon/> {comments.length}
        </div>
        {user && user.id == author.id && (
          <div className={styles.moreIcon}>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="something">
                <FontAwesomeIcon icon={faEllipsisH}/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/edit-post/${id}`}>Edit</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
      {showCommentSection && (
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

const actionCreators = {
  voteOnPost,
  updateVoteOnPost,
  undoVoteOnPost
}

export default connect(mapStateToProps, actionCreators)(Post)
