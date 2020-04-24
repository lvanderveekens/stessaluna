import React, { FC } from "react"
import styles from "./WhatdoyouseeExercise.scss?module"

interface Props {
  id: number
  image: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct: number
  answer?: number
}

const WhatdoyouseeExercise: FC<Props> = ({ image, option1, option2, option3, option4 }) => {
  return (
    <div className={styles.whatdoyouseeExercise}>
      <div className={styles.header}>
        <span>What Do You See</span>
      </div>
      <div className={styles.imageWrapper}>
        <img src={image} />
      </div>
      <div>
        <div className="d-flex">
          <div className={styles.option}>{option1}</div>
          <div className={styles.option}>{option2}</div>
        </div>
        <div className="d-flex">
          <div className={styles.option}>{option3}</div>
          <div className={styles.option}>{option4}</div>
        </div>
      </div>
    </div>
  )
}

export default WhatdoyouseeExercise
