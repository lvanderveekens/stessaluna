import React, { FC, useState, useEffect } from "react"
import styles from "./WhatdoyouseeExerciseInput.scss?module"
import WhatdoyouseeExerciseInputValue from "./whatdoyousee-exercise-input.model"
import ExerciseInputHeader from "../exercise-input-header/ExerciseInputHeader"
import ImageInput from "../../../../image/image-input/ImageInput"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

interface Props {
  onChange: (change: WhatdoyouseeExerciseInputValue) => void
  onClose: () => void
}

const WhatdoyouseeExerciseInput: FC<Props> = ({ onChange, onClose }) => {
  const [image, setImage] = useState<File>(null)
  const [option1, setOption1] = useState<string>("")
  const [option2, setOption2] = useState<string>("")
  const [option3, setOption3] = useState<string>("")
  const [option4, setOption4] = useState<string>("")
  const [correct, setCorrect] = useState<number>(null)

  useEffect(() => {
    onChange(new WhatdoyouseeExerciseInputValue(image, option1, option2, option3, option4, correct))
  }, [image, option1, option2, option3, option4, correct])

  const optionClassName = (option: number) => {
    return cx(styles.option, {
      left: option % 2 !== 0,
      right: option % 2 === 0,
      correct: correct === option,
    })
  }

  return (
    <div className={styles.whatdoyouseeExerciseInput}>
      <ExerciseInputHeader title="What do you see" onClose={onClose} />
      <div className={styles.image}>
        <div className={styles.aspectRatioBox}>
          <ImageInput className={styles.imageInput} value={image} onChange={setImage} />
        </div>
      </div>
      <div>
        <div className="d-flex mb-3">
          <div className={optionClassName(1)}>
            <label onClick={() => setCorrect(1)}>1</label>
            <input
              name="option1"
              type="text"
              value={option1}
              placeholder="Option"
              onChange={(e) => setOption1(e.currentTarget.value)}
            />
          </div>
          <div className={optionClassName(2)}>
            <label onClick={() => setCorrect(2)}>2</label>
            <input
              name="option2"
              type="text"
              value={option2}
              placeholder="Option"
              onChange={(e) => setOption2(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="d-flex mb-3">
          <div className={optionClassName(3)}>
            <label onClick={() => setCorrect(3)}>3</label>
            <input
              name="option3"
              type="text"
              value={option3}
              placeholder="Option"
              onChange={(e) => setOption3(e.currentTarget.value)}
            />
          </div>
          <div className={optionClassName(4)}>
            <label onClick={() => setCorrect(4)}>4</label>
            <input
              name="option4"
              type="text"
              value={option4}
              placeholder="Option"
              onChange={(e) => setOption4(e.currentTarget.value)}
            />
          </div>
        </div>
      </div>
      {!correct && <div className={styles.hint}>Mark the correct option by clicking on the index.</div>}
    </div>
  )
}

export default WhatdoyouseeExerciseInput
