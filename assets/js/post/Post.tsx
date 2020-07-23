import {faCommentAlt} from "@fortawesome/free-regular-svg-icons"
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons"
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
          <span className={styles.usernameAfterFullName}>@{author.username}</span>
        </span>
      )
    }
    return (
      <span>
        <span style={{marginRight: "0.3rem"}}>@{author.username}</span>
      </span>
    )
  }

  const renderExercise = () => {
    const props = {
      ...exercise,
      disabled: !user || user.id == author.id,
    }

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
              in <span className={styles.channel}>{ISO6391.getName(channel)}</span>&nbsp;
              {getCountryCode(channel) && (
                <ReactCountryFlag className={styles.countryFlag} countryCode={getCountryCode(channel)} svg/>
              )}
            </div>
            <span className={styles.timestamp}>{timestamp} {edited && (<span>(edited)</span>)}</span>
          </div>
          {user && user.id == author.id && (
            <div className={styles.threeDotsMenu}>
              <Dropdown alignRight={true}>
                <Dropdown.Toggle as={CustomToggle} id="something">
                    <span className={styles.iconWrapper}>
                      <FontAwesomeIcon className={styles.icon} icon={faEllipsisV}/>
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/edit-post/${id}`}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
        {text && <Text text={text}/>}
        {image && (
          <div className={styles.imageWrapper}>
            <div className={styles.aspectRatioBox}>
              <img src={image.url} alt="Post image"/>
            </div>
          </div>
        )}
        {exercise && renderExercise()}
      </div>
      <div className={styles.activity}>
        {exercise && exercise.answerCount > 0 && <div>Answers: {exercise.answerCount}</div>}
        {comments && comments.length > 0 && (
          <div className={styles.numberOfComments} onClick={toggleCommentSection}>
            Comments: {comments.length}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.addComment} onClick={() => setShowCommentSection(true)}>
          <span className={styles.commentIcon}>
            <FontAwesomeIcon icon={faCommentAlt}/>
          </span>
          Add comment
        </div>
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
