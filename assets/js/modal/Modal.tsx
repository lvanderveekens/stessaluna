import React, { FC, useRef, useEffect } from "react"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import styles from "./Modal.scss?module"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
  title: string
  onClose: () => void
  children: any
}

const Modal: FC<Props> = ({ title, onClose, children }) => {
  const modalWrapperRef = useRef(null)

  useEffect(() => {
    disableBodyScroll(modalWrapperRef.current)
    modalWrapperRef.current.focus()
    return () => {
      enableBodyScroll(modalWrapperRef.current)
    }
  }, [])

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <div ref={modalWrapperRef} className={styles.modalWrapper} tabIndex={0} onKeyDown={onKeyDown} onClick={onClose}>
      <div className={`${styles.modal} animated fadeIn`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span>{title}</span>
          <span className={styles.closeIcon} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
