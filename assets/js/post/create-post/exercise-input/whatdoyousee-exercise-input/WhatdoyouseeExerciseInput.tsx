import React, { FC, useState, useEffect } from "react"
import styles from "./WhatdoyouseeExerciseInput.scss?module"
import WhatdoyouseeExerciseInputValue from "./whatdoyousee-exercise-input.model"
import ExerciseInputHeader from "../exercise-input-header/ExerciseInputHeader"
import ImageInput from "../../../../image/image-input/ImageInput"
import classNames from "classnames/bind"
import ExerciseOptionInput from "../exercise-option-input/ExerciseOptionInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb } from "@fortawesome/free-regular-svg-icons"
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
          <ExerciseOptionInput
            className="mr-1"
            name="option1"
            placeholder="Option 1"
            value={option1}
            onChange={setOption1}
            checked={correct === 1}
            onChecked={(checked) => setCorrect(checked ? 1 : null)}
          />
          <ExerciseOptionInput
            className="ml-2"
            name="option2"
            placeholder="Option 2"
            value={option2}
            onChange={setOption2}
            checked={correct === 2}
            onChecked={(checked) => setCorrect(checked ? 2 : null)}
          />
        </div>
        <div className="d-flex mb-3">
          <ExerciseOptionInput
            className="mr-2"
            name="option3"
            placeholder="Option 3"
            value={option3}
            onChange={setOption3}
            checked={correct === 3}
            onChecked={(checked) => setCorrect(checked ? 3 : null)}
          />
          <ExerciseOptionInput
            className="ml-2"
            name="option4"
            placeholder="Option 4"
            value={option4}
            onChange={setOption4}
            checked={correct === 4}
            onChecked={(checked) => setCorrect(checked ? 4 : null)}
          />
        </div>
      </div>
      {!correct && (
        <div className={styles.hint}>
          <FontAwesomeIcon icon={faLightbulb} /> Tick one of the boxes to mark the correct option.
        </div>
      )}
    </div>
  )
}

export default WhatdoyouseeExerciseInput
