import React, { FC, useState, useEffect } from "react"
import { AorbSentence as AorbSentenceInterface } from "./aorb-exercise.model"
import AorbExercise from "./AorbExercise"
import { connect } from "react-redux"
import { submitAnswer } from "../../store/post/actions"
import { AorbAnswer } from "../answer/answer.model"

interface Props {
  id: number
  sentences: AorbSentenceInterface[]
  submitAnswer: (exerciseId: number, answer: AorbAnswer) => void
  submitting: boolean
}

const AorbExerciseContainer: FC<Props> = ({ id, sentences, submitAnswer, submitting }) => {
  const [choices, setChoices] = useState(new Array(sentences.length).fill(null) as ("a" | "b")[])

  useEffect(() => {
    if (choices.every((c) => c !== null)) {
      submitAnswer(id, new AorbAnswer(choices))
    }
  }, [choices])

  const handleChoice = (index: number) => (choice: "a" | "b") => {
    const updatedChoices = [...choices]
    updatedChoices[index] = choice
    setChoices(updatedChoices)
  }

  return <AorbExercise sentences={sentences} choices={choices} onChoice={handleChoice} submitting={submitting} />
}

const actionCreators = {
  submitAnswer,
}

export default connect(null, actionCreators)(AorbExerciseContainer)
