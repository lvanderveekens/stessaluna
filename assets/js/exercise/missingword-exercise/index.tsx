import React, { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { submitAnswer } from "../../store/post/actions"
import { MissingwordAnswer } from "../answer/answer.model"
import MissingwordExercise from "./MissingwordExercise"

interface Props {
  id: number
  textBefore?: string
  textAfter?: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct: number
  answer?: number
  submitAnswer: (exerciseId: number, answer: MissingwordAnswer) => Promise<void>
}

const MissingwordExerciseContainer: FC<Props> = ({
  id,
  textBefore,
  textAfter,
  option1,
  option2,
  option3,
  option4,
  correct,
  answer,
  submitAnswer,
}) => {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (answer) {
      setSelected(0)
    }
  }, [answer])

  const handleSubmit = (option: number) => {
    setSelected(option)
    submitAnswer(id, new MissingwordAnswer(option))
      .then(() => setSelected(0))
      .catch(() => setSelected(0))
  }

  return (
    <MissingwordExercise
      textBefore={textBefore}
      textAfter={textAfter}
      option1={option1}
      option2={option2}
      option3={option3}
      option4={option4}
      correct={correct}
      selected={selected}
      answer={answer}
      onSubmit={handleSubmit}
    />
  )
}

const actionCreators = {
  submitAnswer,
}

export default connect(null, actionCreators)(MissingwordExerciseContainer)
