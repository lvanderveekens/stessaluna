import {faLightbulb} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {FC, useEffect, useState} from "react"
import TextareaAutosize from "react-autosize-textarea"
import ExerciseInputHeader from "../exercise-input-header/ExerciseInputHeader"
import ExerciseOptionInput from "../exercise-option-input/ExerciseOptionInput"
import {MissingwordExerciseInputValues} from "./missingword-exercise-input.model"
import styles from "./MissingwordExerciseInput.scss?module"

interface Props {
  initialValues: MissingwordExerciseInputValues
  onChange: (change: MissingwordExerciseInputValues) => void
  onClose: () => void
}

const MissingwordExerciseInput: FC<Props> = ({initialValues, onChange, onClose}) => {
  const [textBefore, setTextBefore] = useState<string>(initialValues.textBefore)
  const [textAfter, setTextAfter] = useState<string>(initialValues.textAfter)

  const [option1, setOption1] = useState<string>(initialValues.option1)
  const [option2, setOption2] = useState<string>(initialValues.option2)
  const [option3, setOption3] = useState<string>(initialValues.option3)
  const [option4, setOption4] = useState<string>(initialValues.option4)
  const [correct, setCorrect] = useState<number>(initialValues.correct)

  useEffect(() => {
    onChange(new MissingwordExerciseInputValues(textBefore, textAfter, option1, option2, option3, option4, correct))
  }, [textBefore, textAfter, option1, option2, option3, option4, correct])

  return (
    <div className={styles.missingwordExerciseInput}>
      <ExerciseInputHeader title="Missing word" onClose={onClose} />
      <div className={styles.sentence}>
        <TextareaAutosize
          className={styles.textBefore}
          value={textBefore}
          placeholder="Before"
          onChange={(e) => setTextBefore(e.currentTarget.value)}
        />
        <div className={styles.missingWord}>[ ... ]</div>
        <TextareaAutosize
          className={styles.textAfter}
          value={textAfter}
          placeholder="After"
          onChange={(e) => setTextAfter(e.currentTarget.value)}
        />
      </div>
      <div>
        <div className="d-flex mb-3">
          <ExerciseOptionInput
            className="mr-2"
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

export default MissingwordExerciseInput
