import React from "react"
import classNames from "classnames/bind"
import { FC } from "react"
import styles from "./ExerciseOption.scss?module"
const cx = classNames.bind(styles)

interface Props {
  className?: string
  value: string
  onClick: () => void
  selected: boolean
  correct: boolean
  answer: boolean
  disabled: boolean
}

const ExerciseOption: FC<Props> = ({ className, value, onClick, selected, correct, answer, disabled }) => {
  const wrapperClassName = cx(styles.wrapper, {
    selected,
    correct: correct,
    incorrect: !correct && answer,
    disabled,
  })

  return (
    <div className={`${styles.exerciseOption} ${className}`} onClick={() => !disabled && onClick()}>
      <div className={wrapperClassName}>{value}</div>
    </div>
  )
}

export default ExerciseOption
