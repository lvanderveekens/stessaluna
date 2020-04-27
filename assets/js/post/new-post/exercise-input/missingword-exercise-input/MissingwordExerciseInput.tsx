import classNames from "classnames/bind"
import React, { FC, useEffect, useState } from "react"
import AutosizeInput from "react-input-autosize"
import ExerciseInputHeader from "../exercise-input-header/ExerciseInputHeader"
import { MissingwordExerciseInputValue } from "./missingword-exercise-input.model"
import styles from "./MissingwordExerciseInput.scss?module"
const cx = classNames.bind(styles)

interface Props {
  onChange: (change: MissingwordExerciseInputValue) => void
  onClose: () => void
}

const MissingwordExerciseInput: FC<Props> = ({ onChange, onClose }) => {
  const [textBefore, setTextBefore] = useState<string>("")
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

  return (
    <div className={styles.missingwordExerciseInput}>
      <ExerciseInputHeader title="Missing word" onClose={onClose} />
      <div className={styles.sentenceWrapper}>
        <div className={styles.sentence}>
          <AutosizeInput
            className={styles.textBefore}
            placeholder="The text before..."
            name="textBefore"
            value={textBefore}
            onChange={(e) => setTextBefore(e.currentTarget.value)}
          />
          <div className={styles.missingWord}>[ ... ]</div>
          <AutosizeInput
            className={styles.textAfter}
            placeholder="The text after..."
            name="textAfter"
            value={textAfter}
            onChange={(e) => setTextAfter(e.currentTarget.value)}
          />
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

export default MissingwordExerciseInput
