import React, {FC, useState} from "react"
import {AorbSentence as AorbSentenceInterface} from "./aorb-exercise.interface"
import AorbExerciseContent from "./AorbExerciseContent"
import {connect} from "react-redux"
import {submitAnswer} from "../../exercise/state/exercise.actions"
import {AorbAnswer} from "../answer/answer.model"
import {State} from "../../store";

interface OwnProps {
  id: number
  sentences: AorbSentenceInterface[]
  disabled: boolean
  showLoginSignupModal: () => void
}

interface StateProps {
  loggedIn: boolean
}

interface DispatchProps {
  submitAnswer: (exerciseId: number, answer: AorbAnswer) => Promise<void>
}

type Props = OwnProps & StateProps & DispatchProps

const AorbExerciseContentContainer: FC<Props> = (
  {
    id,
    sentences,
    disabled,
    submitAnswer,
    loggedIn,
    showLoginSignupModal
  }
) => {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (choices: ("a" | "b")[]) => {
    setSubmitting(true)
    submitAnswer(id, new AorbAnswer(choices))
      .then(() => setSubmitting(false))
      .catch(() => setSubmitting(false))
  }

  return (
    <AorbExerciseContent
      sentences={sentences}
      onSubmit={handleSubmit}
      submitting={submitting}
      disabled={disabled}
      loggedIn={loggedIn}
      showLoginSignupModal={showLoginSignupModal}
    />
  )
}

const mapStateToProps = (state: State): StateProps => ({
  loggedIn: state.auth.loggedIn
})

const actionCreators: any = {
  submitAnswer,
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, actionCreators)(AorbExerciseContentContainer)
