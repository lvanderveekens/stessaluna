import React, { FC, useEffect, useState } from "react"
import styles from "./MissingwordExercise.scss?module"
import ExerciseOption from "../exercise-option/ExerciseOption"

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
}) => {
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
            onClick={() => onSubmit(1)}
            selected={selected === 1}
            correct={correct === 1}
            answer={answer === 1}
            disabled={disabled || !!answer || !!selected}
          />
          <ExerciseOption
            className="ml-2"
            value={option2}
            onClick={() => onSubmit(2)}
            selected={selected === 2}
            correct={correct === 2}
            answer={answer === 2}
            disabled={disabled || !!answer || !!selected}
          />
        </div>
        <div className="d-flex">
          <ExerciseOption
            className="mr-2"
            value={option3}
            onClick={() => onSubmit(3)}
            selected={selected === 3}
            correct={correct === 3}
            answer={answer === 3}
            disabled={disabled || !!answer || !!selected}
          />
          <ExerciseOption
            className="ml-2"
            value={option4}
            onClick={() => onSubmit(4)}
            selected={selected === 4}
            correct={correct === 4}
            answer={answer === 4}
            disabled={disabled || !!answer || !!selected}
          />
        </div>
      </div>
    </div>
  )
}

export default MissingwordExercise
