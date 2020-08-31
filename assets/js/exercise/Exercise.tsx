import React, {FC, useState} from "react";
import styles from "./Exercise.scss?module";
import Exercise, {ExerciseType} from "./exercise.interface";
import AorbExerciseContent from "./aorb-exercise-content";
import WhatdoyouseeExerciseContent from "./whatdoyousee-exercise-content";
import MissingwordExerciseContent from "./missingword-exercise-content";
import {ReactComponent as AnswerIcon} from "../../images/icon/answer.svg"
import {ReactComponent as CorrectIcon} from "../../images/icon/correct.svg"
import LoginSignupModal from "./login-signup-modal/LoginSignupModal";
import {State} from "../store";
import {connect} from "react-redux"

interface OwnProps {
  id: number
  disabled: boolean
}

interface StateProps {
  exercise: Exercise
}

type Props = OwnProps & StateProps

const Exercise: FC<Props> = ({exercise, disabled}) => {

  const {type, answerCount, correctAnswersPercentage} = exercise
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false)

  const getHeaderText = () => {
    switch (type) {
      case ExerciseType.A_OR_B:
        return "A or B"
      case ExerciseType.WHAT_DO_YOU_SEE:
        return "What do you see"
      case ExerciseType.MISSING_WORD:
        return "Missing word"
    }
  }

  const renderContent = () => {
    const defaultProps = {disabled, showLoginSignupModal: () => setShowLoginSignupModal(true)}
    switch (exercise.type) {
      case ExerciseType.A_OR_B:
        return <AorbExerciseContent {...({...defaultProps, ...exercise})}/>
      case ExerciseType.WHAT_DO_YOU_SEE:
        return <WhatdoyouseeExerciseContent {...({...defaultProps, ...exercise})} />
      case ExerciseType.MISSING_WORD:
        return <MissingwordExerciseContent {...({...defaultProps, ...exercise})} />
    }
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.header}>
        <span>{getHeaderText()}</span>
      </div>
      {renderContent()}
      {/* TODO: come up with a better name */}
      <div className={styles.actions}>
        <div className={styles.answerIcon}>
          <AnswerIcon/> {answerCount}
        </div>
        <div className={styles.correctIcon}>
          <CorrectIcon/> {Math.round(correctAnswersPercentage * 100)}%
        </div>
      </div>
      {showLoginSignupModal && (
        <LoginSignupModal
          text="Log in or sign up to answer exercises."
          onClose={() => setShowLoginSignupModal(false)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  exercise: state.entities.exercisesById[ownProps.id],
})

export default connect<StateProps, {}, OwnProps>(mapStateToProps, null)(Exercise);