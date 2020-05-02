import React, { FC } from "react"
import styles from "./ExerciseOptionInput.scss?module"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

interface Props {
  className?: string
  name: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  checked: boolean
  onChecked: (checked: boolean) => void
}

const ExerciseOptionInput: FC<Props> = ({ className, name, placeholder, value, onChange, checked, onChecked }) => {
  return (
    <div className={`${styles.optionInput} ${className}`}>
      <div className={cx(styles.wrapper, { checked })}>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={checked} onChange={(e) => onChecked(e.currentTarget.checked)} />
          <span className={styles.checkmark} />
        </label>
        <input
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
    </div>
  )
}

export default ExerciseOptionInput
