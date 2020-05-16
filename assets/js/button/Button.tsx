import React, { FC } from "react"
import styles from "./Button.scss?module"

interface Props {
  className?: string
}

const Button: FC<Props & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
