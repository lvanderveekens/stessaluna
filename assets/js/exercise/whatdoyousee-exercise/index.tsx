import React, {FC, useEffect, useState} from "react"
import WhatdoyouseeExercise from "./WhatdoyouseeExercise"
import {submitAnswer} from "../../store/post/actions"
import {connect} from "react-redux"
import {WhatdoyouseeAnswer} from "../answer/answer.model"
import Image from "../../image/image.interface";

interface Props {
  id: number
  image: Image
  option1: string
  option2: string
  option3: string
  option4: string
  correct: number
  answer?: number
  disabled: boolean
  submitAnswer: (exerciseId: number, answer: WhatdoyouseeAnswer) => Promise<void>
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
  disabled,
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
    <WhatdoyouseeExercise
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
    />
  )
}

const actionCreators = {
  submitAnswer,
}

export default connect(null, actionCreators)(WhatdoyouseeExerciseContainer)
