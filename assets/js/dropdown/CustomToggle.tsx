import React from "react"

interface Props {
  className?: string
  children: any
  onClick?: Function
}

const CustomToggle = React.forwardRef(({ className, children, onClick }: Props, ref: React.Ref<HTMLSpanElement>) => {
  return (
    <span
      ref={ref}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
    </span>
  )
})

export default CustomToggle
