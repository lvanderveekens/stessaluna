import React, {FC, useState} from "react"
import styles from "./MissingwordExercise.scss?module"
import ExerciseOption from "../exercise-option/ExerciseOption"
import LoginSignupModal from "../login-signup-modal/LoginSignupModal";

interface Props {
  textBefore: string
  textAfter: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct?: number
  answer?: number
  selected?: number
  disabled: boolean
  onSubmit: (answer: number) => void
  loggedIn: boolean
}

const MissingwordExercise: FC<Props> = ({
  textBefore,
  textAfter,
  option1,
  option2,
  option3,
  option4,
  correct,
  answer,
  selected,
  disabled,
  onSubmit,
  loggedIn,
}) => {

  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false)

  const handleOptionClick = (option: number) => () => {
    if (!loggedIn) {
      setShowLoginSignupModal(true)
      return
    }
    onSubmit(option)
  }

  return (
    <div className={styles.missingwordExercise}>
      <div className={styles.header}>
        <span>Missing word</span>
      </div>
      <div className={styles.sentence}>
        {textBefore && <div>{textBefore}</div>}
        <div className={styles.missingWord}>[ ... ]</div>
        {textAfter && <div>{textAfter}</div>}
      </div>
      <div>
        <div className="d-flex mb-3">
          <ExerciseOption
            className="mr-2"
            value={option1}
            onClick={handleOptionClick(1)}
            selected={selected === 1}
            correct={answer && correct === 1}
            answer={answer === 1}
            disabled={disabled || !!answer || !!selected}
          />
          <ExerciseOption
            className="ml-2"
            value={option2}
            onClick={handleOptionClick(2)}
            selected={selected === 2}
            correct={answer && correct === 2}
            answer={answer === 2}
            disabled={disabled || !!answer || !!selected}
          />
        </div>
        <div className="d-flex">
          <ExerciseOption
            className="mr-2"
            value={option3}
            onClick={handleOptionClick(3)}
            selected={selected === 3}
            correct={answer && correct === 3}
            answer={answer === 3}
            disabled={disabled || !!answer || !!selected}
          />
          <ExerciseOption
            className="ml-2"
            value={option4}
            onClick={handleOptionClick(4)}
            selected={selected === 4}
            correct={answer && correct === 4}
            answer={answer === 4}
            disabled={disabled || !!answer || !!selected}
          />
        </div>
      </div>
      {showLoginSignupModal && (<LoginSignupModal onClose={() => setShowLoginSignupModal(false)}/>)}
    </div>
  )
}

export default MissingwordExercise
