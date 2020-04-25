import React, { FC } from "react"
import WhatdoyouseeExercise from "./WhatdoyouseeExercise"
import { submitAnswer } from "../../store/post/actions"
import { connect } from "react-redux"
import { WhatdoyouseeAnswer } from "../answer/answer.model"

interface Props {
  id: number
  image: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct: number
  answer?: number
  submitAnswer: (exerciseId: number, answer: WhatdoyouseeAnswer) => void
}

const WhatdoyouseeExerciseContainer: FC<Props> = ({
  id,
  image,
  option1,
  option2,
  option3,
  option4,
  correct,
  answer,
  submitAnswer,
}) => {
  const submitAnswerWrapper = (answer: number) => {
    submitAnswer(id, new WhatdoyouseeAnswer(answer))
  }

  return (
    <WhatdoyouseeExercise
      image={image}
      option1={option1}
      option2={option2}
      option3={option3}
      option4={option4}
      correct={correct}
      answer={answer}
      submitAnswer={submitAnswerWrapper}
    />
  )
}

const actionCreators = {
  submitAnswer,
}

export default connect(null, actionCreators)(WhatdoyouseeExerciseContainer)
