import React, { FC } from "react"
import styles from "./CustomToggle.scss?module"

interface Props {
  className?: string
  children: any
  onClick?: Function
}

const CustomToggle: FC<Props> = ({ className, children, onClick }, ref: React.Ref<HTMLSpanElement>) => {
  return (
    <span
      ref={ref}
      // TOOD: when this is needed, override the .dropdown-toggle:after first to get rid of the caret
      className={`${styles.customToggle} ${className}`}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
    </span>
  )
}

export default React.forwardRef(CustomToggle)
