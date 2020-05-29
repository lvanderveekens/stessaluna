import React, {FC, useEffect, useRef} from "react"
import styles from "./Modal.scss?module"

interface Props {
  onClose: () => void
  children: any
}

const Modal: FC<Props> = ({onClose, children}) => {
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
    <div className={styles.modalWrapper} onClick={onClose}>
      <div ref={modalRef} className={`${styles.modal} animated fadeIn`} tabIndex={0} onKeyDown={onKeyDown}
           onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
