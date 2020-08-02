import React, {FC, useState} from "react"
import {AorbSentence as AorbSentenceInterface} from "./aorb-exercise.model"
import AorbExercise from "./AorbExercise"
import {connect} from "react-redux"
import {submitAnswer} from "../../store/post/actions"
import {AorbAnswer} from "../answer/answer.model"
import {State} from "../../store";

interface Props {
  id: number
  sentences: AorbSentenceInterface[]
  disabled: boolean
  submitAnswer: (exerciseId: number, answer: AorbAnswer) => Promise<void>
  loggedIn: boolean
}

const AorbExerciseContainer: FC<Props> = ({id, sentences, disabled, submitAnswer, loggedIn}) => {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (choices: ("a" | "b")[]) => {
    setSubmitting(true)
    submitAnswer(id, new AorbAnswer(choices))
      .then(() => setSubmitting(false))
      .catch(() => setSubmitting(false))
  }

  return (
    <AorbExercise
      sentences={sentences}
      onSubmit={handleSubmit}
      submitting={submitting}
      disabled={disabled}
      loggedIn={loggedIn}
    />
  )
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.auth.loggedIn
})

const actionCreators = {
  submitAnswer,
}

export default connect(mapStateToProps, actionCreators)(AorbExerciseContainer)
