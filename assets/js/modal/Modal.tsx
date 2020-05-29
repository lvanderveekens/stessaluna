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
  const modalRef = useRef(null)

  useEffect(() => {
    disableBodyScroll(modalRef.current)
    modalRef.current.focus()
    return () => {
      enableBodyScroll(modalRef.current)
    }
  }, [])

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <div className={styles.modalWrapper} onClick={onClose}>
      <div ref={modalRef} className={`${styles.modal} animated fadeIn`} tabIndex={0} onKeyDown={onKeyDown}  onClick={(e) => e.stopPropagation()}>
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
