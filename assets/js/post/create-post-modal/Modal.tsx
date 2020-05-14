import React, { FC, useRef, useEffect } from "react"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import styles from "./Model.scss?module"
import { useHistory } from "react-router-dom"

interface Props {
  className?: string
  previousLocation: Location
  children: any
}
// TODO: move later
const Modal: FC<Props> = ({ previousLocation, children }) => {
  const myRef = useRef(null)
  const history = useHistory()

  useEffect(() => {
    disableBodyScroll(myRef.current)
    myRef.current.focus()
    return () => {
      enableBodyScroll(myRef.current)
    }
  }, [])

  const close = () => {
    console.log("ON CLICK")
    if (previousLocation) {
      history.push(previousLocation.pathname)
    } else {
      history.push("/")
    }
  }

  const onKeyDown = (e) => {
    e.preventDefault()
    if (e.key === "Escape") {
      close()
    }
  }

  return (
    <div ref={myRef} className={styles.modalWrapper} tabIndex={0} onKeyDown={onKeyDown} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
