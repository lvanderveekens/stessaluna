import React, {FC, useEffect, useState} from "react"
import WhatdoyouseeExerciseContent from "./WhatdoyouseeExerciseContent"
import {submitAnswer} from "../../exercise/state/exercise.actions"
import {connect} from "react-redux"
import {WhatdoyouseeAnswer} from "../answer/answer.model"
import Image from "../../image/image.interface";
import {State} from "../../store";

interface OwnProps {
  id: number
  image: Image
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
  submitAnswer: (exerciseId: number, answer: WhatdoyouseeAnswer) => Promise<void>
}

type Props = OwnProps & StateProps & DispatchProps

const WhatdoyouseeExerciseContentContainer: FC<Props> = ({
  id,
  image,
  option1,
  option2,
  option3,
  option4,
  correct,
  answer,
  submitAnswer,
  disabled,
  loggedIn,
  showLoginSignupModal,
}) => {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (answer) {
      setSelected(0)
    }
  }, [answer])

  const handleSubmit = (option: number) => {
    setSelected(option)
    submitAnswer(id, new WhatdoyouseeAnswer(option))
      .then(() => setSelected(0))
      .catch(() => setSelected(0))
  }

  return (
    <WhatdoyouseeExerciseContent
      image={image}
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

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, actionCreators)(WhatdoyouseeExerciseContentContainer)
