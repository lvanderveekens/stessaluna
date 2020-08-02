import React, {FC, useEffect, useState} from "react"
import {connect} from "react-redux"
import {submitAnswer} from "../../store/post/actions"
import {MissingwordAnswer} from "../answer/answer.model"
import MissingwordExercise from "./MissingwordExercise"
import {State} from "../../store";

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
  disabled: boolean
  submitAnswer: (exerciseId: number, answer: MissingwordAnswer) => Promise<void>
  loggedIn: boolean
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
  disabled,
  submitAnswer,
  loggedIn,
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
      answer={answer}
      selected={selected}
      disabled={disabled}
      onSubmit={handleSubmit}
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

export default connect(mapStateToProps, actionCreators)(MissingwordExerciseContainer)
