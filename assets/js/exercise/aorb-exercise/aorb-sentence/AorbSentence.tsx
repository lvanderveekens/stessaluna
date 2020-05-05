import React, { FunctionComponent } from "react"
import styles from "./AorbSentence.scss?module"
import classNames from "classnames/bind"
import { AorbChoice } from "../aorb-exercise.model"
const cx = classNames.bind(styles)

interface Props {
  textBefore: string
  choice: AorbChoice
  textAfter: string
  onChoice: (choice: "a" | "b") => void
  selected?: "a" | "b"
  disabled: boolean
}

const AorbSentence: FunctionComponent<Props> = ({ textBefore, choice, textAfter, onChoice, selected, disabled }) => {
  const choiceClassName = (aOrB: "a" | "b") =>
    cx(aOrB, {
      disabled,
      selected: selected && selected === aOrB,
      correct: choice.answer && choice.answer === aOrB && choice.correct && choice.correct === aOrB,
      incorrect: choice.answer && choice.answer === aOrB && choice.correct && choice.correct !== aOrB,
    })

  return (
    <div className={styles.sentence}>
      {textBefore}
      <span className={choiceClassName("a")} onClick={() => !disabled && onChoice("a")}>
        <span className={styles.label}>A</span>
        <span className={styles.text}>{choice.a}</span>
      </span>
      <span className={choiceClassName("b")} onClick={() => !disabled && onChoice("b")}>
        <span className={styles.label}>B</span>
        <span className={styles.text}>{choice.b}</span>
      </span>
      {textAfter}
    </div>
  )
}

export default AorbSentence
