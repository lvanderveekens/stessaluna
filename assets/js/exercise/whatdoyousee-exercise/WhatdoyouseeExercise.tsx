import React, { FC, useState, useEffect } from "react"
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
  submitting: boolean
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
  submitting,
}) => {
  const answered = answer || submitting
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (answer) {
      setSelected(0)
    }
  }, [answer])

  const optionClassName = (option: number) =>
    cx(styles.option, {
      left: option % 2 !== 0,
      right: option % 2 === 0,
      selected: option === selected,
      answered,
      correct: option === correct,
      incorrect: option === answer && option !== correct,
    })

  const handleClickOption = (option: number) => () => {
    if (!answered) {
      setSelected(option)
      submitAnswer(option)
    }
  }

  return (
    <div className={styles.whatdoyouseeExercise}>
      <div className={styles.header}>
        <span>What do you see</span>
      </div>
      <div className={styles.imageWrapper}>
        <img src={image} />
      </div>
      <div>
        <div className="d-flex mb-3">
          <div className={optionClassName(1)} onClick={handleClickOption(1)}>
            {option1}
          </div>
          <div className={optionClassName(2)} onClick={handleClickOption(2)}>
            {option2}
          </div>
        </div>
        <div className="d-flex mb-3">
          <div className={optionClassName(3)} onClick={handleClickOption(3)}>
            {option3}
          </div>
          <div className={optionClassName(4)} onClick={handleClickOption(4)}>
            {option4}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatdoyouseeExercise
