import React, { FC, useState, useEffect } from "react"
import { AorbSentence as AorbSentenceInterface } from "./aorb-exercise.model"
import AorbExercise from "./AorbExercise"
import { connect } from "react-redux"
import { submitAnswer } from "../../store/post/actions"
import { AorbAnswer } from "../answer/answer.model"

interface Props {
  id: number
  sentences: AorbSentenceInterface[]
  disabled: boolean
  submitAnswer: (exerciseId: number, answer: AorbAnswer) => Promise<void>
}

const AorbExerciseContainer: FC<Props> = ({ id, sentences, disabled, submitAnswer }) => {
  const [choices, setChoices] = useState(new Array(sentences.length).fill(null) as ("a" | "b")[])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (choices.every((c) => c !== null)) {
      setSubmitting(true)
      submitAnswer(id, new AorbAnswer(choices))
        .then(() => setSubmitting(false))
        .catch(() => setSubmitting(false))
    }
  }, [choices])

  const handleChoice = (index: number) => (choice: "a" | "b") => {
    const updatedChoices = [...choices]
    updatedChoices[index] = choice
    setChoices(updatedChoices)
  }

  return (
    <AorbExercise
      sentences={sentences}
      choices={choices}
      onChoice={handleChoice}
      submitting={submitting}
      disabled={disabled}
    />
  )
}

const actionCreators = {
  submitAnswer,
}

export default connect(null, actionCreators)(AorbExerciseContainer)
