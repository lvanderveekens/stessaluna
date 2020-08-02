import React, {FC} from "react"
import styles from "./Button.scss?module"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

interface Props {
  className?: string
  variant?: "light" | "dark" | "transparent-light" | "transparent-dark"
}

const Button: FC<Props & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  variant = "dark",
  children,
  ...props
}) => {
  return (
    <button className={cx(styles.button, className, variant)} {...props}>
      {children}
    </button>
  )
}

export default Button
