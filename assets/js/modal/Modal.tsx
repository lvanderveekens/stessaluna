import React, { FC, useRef, useEffect } from "react"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import styles from "./Modal.scss?module"
import { useHistory } from "react-router-dom"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
  title: string
  previousLocation: Location
  children: any
}
// TODO: move later
const Modal: FC<Props> = ({ title, previousLocation, children }) => {
  const modalWrapperRef = useRef(null)
  const history = useHistory()

  useEffect(() => {
    disableBodyScroll(modalWrapperRef.current)
    modalWrapperRef.current.focus()
    return () => {
      enableBodyScroll(modalWrapperRef.current)
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
    if (e.key === "Escape") {
      close()
    }
  }

  return (
    <div ref={modalWrapperRef} className={styles.modalWrapper} tabIndex={0} onKeyDown={onKeyDown} onClick={close}>
      <div className={`${styles.modal} animated fadeIn`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span>{title}</span>
          <span className={styles.closeIcon} onClick={close}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
