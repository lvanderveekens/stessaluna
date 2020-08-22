import React, {FC, useState} from "react";
import styles from "./Exercise.scss?module";
import {ExerciseType} from "./exercise.interface";
import AorbExerciseContent from "./aorb-exercise-content";
import WhatdoyouseeExerciseContent from "./whatdoyousee-exercise-content";
import MissingwordExerciseContent from "./missingword-exercise-content";
import {ReactComponent as AnswerIcon} from "../../images/icon/answer.svg"
import LoginSignupModal from "./login-signup-modal/LoginSignupModal";


interface Props {
  type: ExerciseType
  answerCount: number
  disabled: boolean
}

const Exercise: FC<Props> = ({type, answerCount, ...props}) => {

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
    const contentProps = {...props, showLoginSignupModal: () => setShowLoginSignupModal(true)}
    switch (type) {
      case ExerciseType.A_OR_B:
        return <AorbExerciseContent {...contentProps} />
      case ExerciseType.WHAT_DO_YOU_SEE:
        return <WhatdoyouseeExerciseContent {...contentProps} />
      case ExerciseType.MISSING_WORD:
        return <MissingwordExerciseContent {...contentProps} />
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

export default Exercise;