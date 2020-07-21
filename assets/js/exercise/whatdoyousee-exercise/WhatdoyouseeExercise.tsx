import React, {FC} from "react"
import styles from "./WhatdoyouseeExercise.scss?module"
import classNames from "classnames/bind"
import ExerciseOption from "../exercise-option/ExerciseOption"
import Image from "../../image/image.interface";

const cx = classNames.bind(styles)

interface Props {
  image: Image
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

const WhatdoyouseeExercise: FC<Props> = ({
  image,
  option1,
  option2,
  option3,
  option4,
  correct,
  answer,
  selected,
  onSubmit,
  disabled,
}) => {
  return (
    <div className={styles.whatdoyouseeExercise}>
      <div className={styles.header}>
        <span>What do you see</span>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.aspectRatioBox}>
          <img src={image.url}/>
        </div>
      </div>
      <div>
        <div className="d-flex mb-3">
          <ExerciseOption
            className="mr-2"
            value={option1}
            onClick={() => onSubmit(1)}
            selected={selected === 1}
            correct={answer && correct === 1}
            answer={answer === 1}
            disabled={disabled || !!answer || !!selected}
          />
          <ExerciseOption
            className="ml-2"
            value={option2}
            onClick={() => onSubmit(2)}
            selected={selected === 2}
            correct={answer && correct === 2}
            answer={answer === 2}
            disabled={disabled || !!answer || !!selected}
          />
        </div>
        <div className="d-flex mb-3">
          <ExerciseOption
            className="mr-2"
            value={option3}
            onClick={() => onSubmit(3)}
            selected={selected === 3}
            correct={answer && correct === 3}
            answer={answer === 3}
            disabled={disabled || !!answer || !!selected}
          />
          <ExerciseOption
            className="ml-2"
            value={option4}
            onClick={() => onSubmit(4)}
            selected={selected === 4}
            correct={answer && correct === 4}
            answer={answer === 4}
            disabled={disabled || !!answer || !!selected}
          />
        </div>
      </div>
    </div>
  )
}

export default WhatdoyouseeExercise
