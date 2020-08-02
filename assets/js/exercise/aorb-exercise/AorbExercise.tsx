import React, {FC, useEffect, useState} from "react"
import styles from "./AorbExercise.scss?module"
import {AorbSentence as AorbSentenceInterface} from "./aorb-exercise.model"
import AorbSentence from "./aorb-sentence/AorbSentence"
import LoginSignupModal from "../login-signup-modal/LoginSignupModal";

interface Props {
  sentences: AorbSentenceInterface[]
  onSubmit: (choices: ("a" | "b")[]) => void
  submitting: boolean
  disabled: boolean
  loggedIn: boolean
}

const AorbExercise: FC<Props> = ({sentences, onSubmit, submitting, disabled, loggedIn}) => {

  const [choices, setChoices] = useState(new Array(sentences.length).fill(null) as ("a" | "b")[])
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false)

  const handleChoice = (index: number) => (choice: "a" | "b") => {
    if (!loggedIn) {
      setShowLoginSignupModal(true)
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
              onChoice={handleChoice(i)}
              selected={choices[i]}
              disabled={disabled || !!sentence.choice.answer || submitting}
            />
          </div>
        ))}
      </div>
      {showLoginSignupModal && (<LoginSignupModal onClose={() => setShowLoginSignupModal(false)}/>)}
    </div>
  )
}

export default AorbExercise
