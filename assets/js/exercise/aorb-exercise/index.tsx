import React, { FC, useState } from "react"
import { AorbSentence as AorbSentenceInterface } from "./aorb-exercise.model"
import AorbExercise from "./AorbExercise"
import { connect } from "react-redux"
import { submitAnswer } from "../../store/post/actions"
import { AorbAnswer } from "../answer/answer.model"

interface Props {
  id: number
  sentences: AorbSentenceInterface[]
  submitAnswer: (exerciseId: number, answer: AorbAnswer) => void
}

const AorbExerciseContainer: FC<Props> = ({ id, sentences, submitAnswer }) => {
  const [choices, setChoices] = useState(new Array(sentences.length).fill(null) as ("a" | "b")[])

  const handleChoice = (index: number) => (choice: "a" | "b") => {
    setChoices(choices.map((c, i) => (i == index ? choice : c)))
  }

  const handleSubmit = () => {
    submitAnswer(id, new AorbAnswer(choices))
  }

  const submitDisabled = sentences.some((s) => s.choice.answer !== null)

  return (
    <AorbExercise
      sentences={sentences}
      choices={choices}
      onChoice={handleChoice}
      onSubmit={handleSubmit}
      submitDisabled={submitDisabled}
    />
  )
}

const actionCreators = {
  submitAnswer,
}

export default connect(null, actionCreators)(AorbExerciseContainer)
