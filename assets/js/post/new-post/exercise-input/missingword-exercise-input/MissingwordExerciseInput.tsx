import classNames from "classnames/bind"
import React, { FC, useEffect, useState, useRef } from "react"
import AutosizeInput from "react-input-autosize"
import ExerciseInputHeader from "../exercise-input-header/ExerciseInputHeader"
import { MissingwordExerciseInputValue } from "./missingword-exercise-input.model"
import ContentEditable from "react-contenteditable"
import TextareaAutosize from "react-autosize-textarea"
import styles from "./MissingwordExerciseInput.scss?module"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb } from "@fortawesome/free-regular-svg-icons"
const cx = classNames.bind(styles)

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

  const optionClassName = (option: number) => {
    return cx(styles.option, {
      left: option % 2 !== 0,
      right: option % 2 === 0,
      correct: correct === option,
    })
  }

  const handleCheckboxChange = (option: number) => (e) => {
    return e.currentTarget.checked ? setCorrect(option) : setCorrect(null)
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
          <div className={optionClassName(1)}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={correct === 1} onChange={handleCheckboxChange(1)} />
              <span className={styles.checkmark} />
            </label>
            <input
              name="option1"
              type="text"
              value={option1}
              placeholder="Option 1"
              onChange={(e) => setOption1(e.currentTarget.value)}
            />
          </div>
          <div className={optionClassName(2)}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={correct === 2} onChange={handleCheckboxChange(2)} />
              <span className={styles.checkmark} />
            </label>
            <input
              name="option2"
              type="text"
              value={option2}
              placeholder="Option 2"
              onChange={(e) => setOption2(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="d-flex mb-3">
          <div className={optionClassName(3)}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={correct === 3} onChange={handleCheckboxChange(3)} />
              <span className={styles.checkmark} />
            </label>
            <input
              name="option3"
              type="text"
              value={option3}
              placeholder="Option 3"
              onChange={(e) => setOption3(e.currentTarget.value)}
            />
          </div>
          <div className={optionClassName(4)}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={correct === 4} onChange={handleCheckboxChange(4)} />
              <span className={styles.checkmark} />
            </label>
            <input
              name="option4"
              type="text"
              value={option4}
              placeholder="Option 4"
              onChange={(e) => setOption4(e.currentTarget.value)}
            />
          </div>
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
