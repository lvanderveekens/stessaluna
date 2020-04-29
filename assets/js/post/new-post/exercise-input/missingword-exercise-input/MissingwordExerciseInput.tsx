import React, { FC, useEffect, useState, useRef } from "react"
import AutosizeInput from "react-input-autosize"
import ExerciseInputHeader from "../exercise-input-header/ExerciseInputHeader"
import { MissingwordExerciseInputValue } from "./missingword-exercise-input.model"
import ContentEditable from "react-contenteditable"
import TextareaAutosize from "react-autosize-textarea"
import styles from "./MissingwordExerciseInput.scss?module"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb } from "@fortawesome/free-regular-svg-icons"
import OptionInput from "../option-input/OptionInput"

interface Props {
  onChange: (change: MissingwordExerciseInputValue) => void
  onClose: () => void
}

const MissingwordExerciseInput: FC<Props> = ({ onChange, onClose }) => {
  const [textBefore, setTextBefore] = useState<string>("")

  const textBeforeRef = useRef("")

  const [textAfter, setTextAfter] = useState<string>("")

  const [option1, setOption1] = useState<string>("")
  const [option2, setOption2] = useState<string>("")
  const [option3, setOption3] = useState<string>("")
  const [option4, setOption4] = useState<string>("")
  const [correct, setCorrect] = useState<number>(null)

  useEffect(() => {
    // onChange(new MissingwordExerciseInputValue(image, option1, option2, option3, option4, correct))
  }, [/* todo */ option1, option2, option3, option4, correct])

  const handleChecked = (option: number) => (checked: boolean) => {
    if (checked) {
      setCorrect(option)
    } else {
      setCorrect(null)
    }
  }

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
          <OptionInput
            className="mr-2"
            name="option1"
            placeholder="Option 1"
            value={option1}
            onChange={setOption1}
            checked={correct === 1}
            onChecked={handleChecked(1)}
          />
          <OptionInput
            className="ml-2"
            name="option2"
            placeholder="Option 2"
            value={option2}
            onChange={setOption2}
            checked={correct === 2}
            onChecked={handleChecked(2)}
          />
        </div>
        <div className="d-flex mb-3">
          <OptionInput
            className="mr-2"
            name="option3"
            placeholder="Option 3"
            value={option3}
            onChange={setOption3}
            checked={correct === 3}
            onChecked={handleChecked(3)}
          />
          <OptionInput
            className="ml-2"
            name="option4"
            placeholder="Option 4"
            value={option4}
            onChange={setOption4}
            checked={correct === 4}
            onChecked={handleChecked(4)}
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
