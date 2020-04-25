import React, { FC } from "react"
import styles from "./WhatdoyouseeExercise.scss?module"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

interface Props {
  image: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct: number
  answer?: number
  submitAnswer: (answer: number) => void
}

const WhatdoyouseeExercise: FC<Props> = ({
  image,
  option1,
  option2,
  option3,
  option4,
  correct,
  answer,
  submitAnswer,
}) => {
  const option1ClassName = cx("option", {
    correct: answer === 1 && correct === 1,
    incorrect: answer === 1 && correct !== 1,
  })
  const option2ClassName = cx("option", {
    correct: answer === 2 && correct === 2,
    incorrect: answer === 2 && correct !== 2,
  })
  const option3ClassName = cx("option", {
    correct: answer === 3 && correct === 3,
    incorrect: answer === 3 && correct !== 3,
  })
  const option4ClassName = cx("option", {
    correct: answer === 4 && correct === 4,
    incorrect: answer === 4 && correct !== 4,
  })

  return (
    <div className={styles.whatdoyouseeExercise}>
      <div className={styles.header}>
        <span>What do you see?</span>
      </div>
      <div className={styles.imageWrapper}>
        <img src={image} />
      </div>
      <div>
        <div className="d-flex mb-3">
          <div className={option1ClassName} onClick={() => submitAnswer(1)}>
            {option1}
          </div>
          <div className={option2ClassName} onClick={() => submitAnswer(2)}>
            {option2}
          </div>
        </div>
        <div className="d-flex mb-3">
          <div className={option3ClassName} onClick={() => submitAnswer(3)}>
            {option3}
          </div>
          <div className={option4ClassName} onClick={() => submitAnswer(4)}>
            {option4}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatdoyouseeExercise
