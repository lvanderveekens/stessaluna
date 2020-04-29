import React, { FC } from "react"
import styles from "./MissingwordExercise.scss?module"

const MissingwordExercise: FC = ({}) => {
  return (
    <div className={styles.missingwordExercise}>
      <div className={styles.header}>
        <span>Missing word</span>
      </div>
    </div>
  )
}

export default MissingwordExercise
