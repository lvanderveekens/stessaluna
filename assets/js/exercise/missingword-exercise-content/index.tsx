import React, {FC, useEffect, useState} from "react"
import {connect} from "react-redux"
import {submitAnswer} from "../state/exercise.actions"
import {MissingwordAnswer} from "../answer/answer.model"
import MissingwordExerciseContent from "./MissingwordExerciseContent"
import {State} from "../../store";

interface OwnProps {
  id: number
  textBefore?: string
  textAfter?: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct: number
  answer?: number
  disabled: boolean
  showLoginSignupModal: () => void
}

interface StateProps {
  loggedIn: boolean
}

interface DispatchProps {
  submitAnswer: (exerciseId: number, answer: MissingwordAnswer) => Promise<void>
}

type Props = OwnProps & StateProps & DispatchProps

const MissingwordExerciseContentContainer: FC<Props> = ({
  id,
  textBefore,
  textAfter,
  option1,
  option2,
  option3,
  option4,
  correct,
  answer,
  disabled,
  submitAnswer,
  loggedIn,
  showLoginSignupModal
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
    <MissingwordExerciseContent
      textBefore={textBefore}
      textAfter={textAfter}
      option1={option1}
      option2={option2}
      option3={option3}
      option4={option4}
      correct={correct}
      answer={answer}
      selected={selected}
      disabled={disabled}
      onSubmit={handleSubmit}
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

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, actionCreators)(MissingwordExerciseContentContainer)
