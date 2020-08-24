import React, {FC, useEffect, useState} from "react"
import styles from "./AorbExerciseContent.scss?module"
import {AorbSentence as AorbSentenceInterface} from "./aorb-exercise.interface"
import AorbSentence from "./aorb-sentence/AorbSentence"

interface Props {
  sentences: AorbSentenceInterface[]
  onSubmit: (choices: ("a" | "b")[]) => void
  submitting: boolean
  disabled: boolean
  loggedIn: boolean
  showLoginSignupModal: () => void
}

const AorbExerciseContent: FC<Props> = ({sentences, onSubmit, submitting, disabled, loggedIn, showLoginSignupModal}) => {

  const [choices, setChoices] = useState(new Array(sentences.length).fill(null) as ("a" | "b")[])

  const handleChoice = (index: number) => (choice: "a" | "b") => {
    if (!loggedIn) {
      showLoginSignupModal()
      return
    }
    const updatedChoices = [...choices]
    updatedChoices[index] = choice
    setChoices(updatedChoices)
  }

  useEffect(() => {
    if (choices.every((c) => c !== null)) {
      onSubmit(choices)
    }
  }, [choices])

  return (
    <div className={styles.aorbExerciseContent}>
      {sentences.map((sentence, i) => (
        <div key={i} className={styles.sentenceWrapper}>
          <span className={styles.index}>{i + 1}:</span>
          <AorbSentence
            textBefore={sentence.textBefore}
            choice={sentence.choice}
            textAfter={sentence.textAfter}
            onChoice={handleChoice(i)}
            selected={choices[i]}
            disabled={disabled || !!sentence.choice.answer || submitting}
          />
        </div>
      ))}
    </div>
  )
}

export default AorbExerciseContent
