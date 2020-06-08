import React, {FC, useEffect, useRef} from "react"
import styles from "./Modal.scss?module"
import {Col, Container, Row} from "react-bootstrap";
import {COLUMN_BREAKPOINTS} from "../config/column-breakpoints";

interface Props {
  className?: string
  onClose: () => void
  children: any
}

const Modal: FC<Props> = ({className, onClose, children}) => {
  const modalRef = useRef(null)

  useEffect(() => {
    modalRef.current.focus()
  }, [])

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <div className={`${styles.modalWrapper} ${className}`} onClick={onClose}>
      <div ref={modalRef} className={`${styles.modal} animated fadeIn`} tabIndex={0} onKeyDown={onKeyDown}
           onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
