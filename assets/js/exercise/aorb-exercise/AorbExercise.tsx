import React, { FC } from "react"
import styles from "./AorbExercise.scss?module"
import { AorbSentence as AorbSentenceInterface } from "./aorb-exercise.model"
import AorbSentence from "./aorb-sentence/AorbSentence"

interface Props {
  sentences: AorbSentenceInterface[]
  choices: ("a" | "b")[]
  onChoice: (index: number) => (choice: "a" | "b") => void
  submitting: boolean
}

const AorbExercise: FC<Props> = ({ sentences, choices, onChoice, submitting }) => {
  return (
    <div className={styles.exercise}>
      <div className={styles.header}>
        <span>A or B</span>
      </div>
      <div className={styles.sentences}>
        {sentences.map((sentence, i) => (
          <div key={i} className={styles.sentenceWrapper}>
            <span className={styles.index}>{i + 1}:</span>
            <AorbSentence
              textBefore={sentence.textBefore}
              choice={sentence.choice}
              textAfter={sentence.textAfter}
              onChoice={onChoice(i)}
              selected={choices[i]}
              submitting={submitting}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AorbExercise
