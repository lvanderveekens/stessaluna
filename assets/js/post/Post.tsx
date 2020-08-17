import {faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {FunctionComponent, useEffect, useState} from "react"
import {Dropdown} from "react-bootstrap"
import ReactCountryFlag from "react-country-flag"
import {connect} from "react-redux"
import CustomToggle from "../dropdown/custom-toggle/CustomToggle"
import AorbExercise from "../exercise/aorb-exercise"
import {isAnswered} from "../exercise/exercise.helper"
import Exercise, {ExerciseType} from "../exercise/exercise.model"
import MissingwordExercise from "../exercise/missingword-exercise"
import WhatdoyouseeExercise from "../exercise/whatdoyousee-exercise"
import Avatar from "../user/avatar/Avatar"
import User from "../user/user.interface"
import CommentSection from "./comment/comment-section"
import styles from "./Post.scss?module"
import Text from "./text/Text"
import {getCountryCode} from "../country/get-country-code"
import ISO6391 from "iso-639-1"
import Comment from "./comment/comment.interface";
import {Link} from "react-router-dom";
import Image from "../image/image.interface";
import Vote, {VoteType} from "./vote/vote.interface";

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
  user?: User
}

const Post: FunctionComponent<Props> = (
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
  }
) => {
  const [showCommentSection, setShowCommentSection] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)
  const [numberOfPreviewComments, setNumberOfPreviewComments] = useState(1)

  useEffect(() => {
    if (comments.length > 0) {
      toggleCommentSection()
    }
  }, [])

  const toggleCommentSection = () => {
    setShowCommentSection(!showCommentSection)
  }

  const renderUserName = () => {
    if (author.displayName) {
      return (
        <span>
          <span className={styles.fullName}>{author.displayName}</span>
        </span>
      )
    } else {
      return (
        <span>
          <span style={{marginRight: "0.3rem"}}>@{author.username}</span>
        </span>
      )
    }
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

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        {/* TODO: separate post-header component */}
        <div className={styles.header}>
          <div className={styles.avatar}>
            <Avatar src={author.avatar.url} countryCode={author.country}/>
          </div>
          <div className={styles.usernameTimestampWrapper}>
            <div>{renderUserName()}</div>
            <div className={styles.channelWrapper}>
              posted in <span className={styles.channel}>{ISO6391.getName(channel)}</span>&nbsp;
              {getCountryCode(channel) && (
                <ReactCountryFlag className={styles.countryFlag} countryCode={getCountryCode(channel)} svg/>
              )}
            </div>
            <span className={styles.timestamp}>{timestamp} {edited && (<span>(edited)</span>)}</span>
          </div>
        </div>
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
                <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.51629 13.1267L3.67824 13.745L4.2394 13.4389L7.1275 11.8636H10C11.933 11.8636 13.5 10.2966 13.5 8.36364V4C13.5 2.067 11.933 0.5 10 0.5H4C2.067 0.5 0.5 2.067 0.5 4V8.36364C0.5 10.0067 1.63213 11.3853 3.15885 11.7619L3.51629 13.1267Z" stroke="#838383"/>
                  <path d="M5 10L5.66667 8M9 10L8.33333 8M8.33333 8L8 7L7 4L6 7L5.66667 8M8.33333 8H5.66667" stroke="#838383"/>
                </svg>
                {exercise.answerCount}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.postIcons}>
        <div className={styles.likeIcon}>
          <svg viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.54618 5.65984C3.54618 5.65984 5.93762 5.65216 5.93762 1.9707C5.93762 -1.2912 10.421 1.66617 9.18322 4.42052C15.2387 4.42052 11.7368 11.9234 8.64228 11.9234H3.54618M3.54618 5.65984V11.9234M3.54618 5.65984V4.99187H0.5V8.76531V12.5388L3.54618 12.5387V11.9234" stroke="#838383"/>
          </svg>
          {votes.filter((v: Vote) => v.type == VoteType.UP).length}
        </div>
        <div className={styles.dislikeIcon}>
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.95382 7.87891C9.95382 7.87891 7.56238 7.88659 7.56238 11.5681C7.56238 14.83 3.07896 11.8726 4.31678 9.11823C-1.73867 9.11823 1.76315 1.61531 4.85772 1.61531L9.95382 1.61531M9.95382 7.87891L9.95382 1.61531M9.95382 7.87891V8.54688H13L13 4.77344V1.00001L9.95382 1.00003V1.61531" stroke="#838383"/>
          </svg>
          {votes.filter((v: Vote) => v.type == VoteType.DOWN).length}
        </div>
        <div className={styles.commentIcon} onClick={toggleCommentSection}>
          <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.51631 13.1267L3.67826 13.745L4.23943 13.4389L7.1275 11.8636H10C11.933 11.8636 13.5 10.2966 13.5 8.36364V4C13.5 2.067 11.933 0.5 10 0.5H4C2.067 0.5 0.5 2.067 0.5 4V8.36364C0.5 10.0067 1.63214 11.3853 3.15887 11.7619L3.51631 13.1267Z"
              stroke="#838383"/>
          </svg>
          {comments.length}
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

export default connect(mapStateToProps, null)(Post)
