import React, { useState, FunctionComponent, useEffect } from "react"
import styles from "./Post.scss?module"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons"
import { connect } from "react-redux"
import { addComment } from "../store/post/actions"
import CommentSection from "./comment/comment-section"
import User from "../user/user.interface"
import { Dropdown } from "react-bootstrap"
import CustomToggle from "../dropdown/CustomToggle"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import Avatar from "../user/avatar/Avatar"
import Exercise from "../exercise/exercise.model"
import AorbExercise from "../exercise/aorb-exercise"
import Text from "./text/Text"
import WhatdoyouseeExercise from "../exercise/whatdoyousee-exercise"
import MissingwordExercise from "../exercise/missingword-exercise"

interface Props {
  id: number
  author: User
  timestamp: string
  text?: string
  image?: string
  exercise?: Exercise
  onDelete: () => void
  comments: any[]
  user: User
}

const Post: FunctionComponent<Props> = ({ id, author, timestamp, text, image, exercise, comments, onDelete, user }) => {
  const [showComments, setShowComments] = useState(false)
  // TODO: this is here in order to keep state when comment section is unmounted... is there a better way?
  const [showAllComments, setShowAllComments] = useState(false)
  const [numberOfPreviewComments, setNumberOfPreviewComments] = useState(1)

  useEffect(() => {
    if (comments.length > 0) {
      setShowComments(true)
    }
  }, [])

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const renderUserName = () => {
    if (author.firstName && author.lastName) {
      return (
        <span>
          <span className={styles.fullName}>
            {author.firstName} {author.lastName}
          </span>
          <span className={styles.usernameAfterFullName}>@{author.username}</span>
        </span>
      )
    }
    return (
      <span>
        <span style={{ marginRight: "0.3rem" }}>@{author.username}</span>
      </span>
    )
  }

  const renderExercise = () => {
    switch (exercise.type) {
      case "aorb":
        return <AorbExercise id={exercise.id} sentences={exercise.sentences} />
      case "whatdoyousee":
        return (
          <WhatdoyouseeExercise
            id={exercise.id}
            image={exercise.image}
            option1={exercise.option1}
            option2={exercise.option2}
            option3={exercise.option3}
            option4={exercise.option4}
            correct={exercise.correct}
            answer={exercise.answer}
          />
        )
      case "missingword":
        return (
          <MissingwordExercise
            id={exercise.id}
            textBefore={exercise.textBefore}
            textAfter={exercise.textAfter}
            option1={exercise.option1}
            option2={exercise.option2}
            option3={exercise.option3}
            option4={exercise.option4}
            correct={exercise.correct}
            answer={exercise.answer}
          />
        )
    }
  }

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className="d-flex w-100 align-items-center">
            <div className="mr-3">
              <Avatar src={author.avatar} countryCode={author.country} />
            </div>
            <div className={styles.usernameTimestampWrapper}>
              <div>{renderUserName()}</div>
              <span className={styles.timestamp}>{timestamp}</span>
            </div>
            {user.id == author.id && (
              <div className={styles.threeDotsMenu}>
                <Dropdown alignRight={true}>
                  <Dropdown.Toggle as={CustomToggle} id="something">
                    <span className={styles.iconWrapper}>
                      <FontAwesomeIcon className={styles.icon} icon={faEllipsisV} />
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
        {text && <Text text={text} />}
        {image && <img className={styles.image} src={image} />}
        {exercise && renderExercise()}
      </div>
      <div className={styles.activity}>
        {exercise && exercise.answerCount > 0 && <div>Answers: {exercise.answerCount}</div>}
        {comments && comments.length > 0 && (
          <div className={styles.numberOfComments} onClick={toggleComments}>
            Comments: {comments.length}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.addComment} onClick={() => setShowComments(true)}>
          <span className={styles.commentIcon}>
            <FontAwesomeIcon icon={faCommentAlt} />
          </span>
          Add comment
        </div>
      </div>
      {showComments && (
        <CommentSection
          postId={id}
          comments={comments}
          showAll={showAllComments}
          setShowAll={setShowAllComments}
          numberOfPreviewComments={numberOfPreviewComments}
          setNumberOfPreviewComments={setNumberOfPreviewComments}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

const actionCreators = {
  addComment,
}

export default connect(mapStateToProps, actionCreators)(Post)
