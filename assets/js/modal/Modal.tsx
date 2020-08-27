import React, {ForwardRefRenderFunction} from "react"
import styles from "./Modal.scss?module"

interface Props {
  className?: string
  overlayClassName?: string
  onClose: () => void
  children: any
}

const Modal: ForwardRefRenderFunction<HTMLDivElement, Props> = ({className, overlayClassName, onClose, children}, ref: React.Ref<HTMLDivElement>) => {

  const handleKeyDown= (e) => {
    if (e.key === "Escape") {
      e.stopPropagation()
      onClose()
    }
  }

  return (
    <div className={`${styles.modalOverlay} ${overlayClassName}`} onClick={onClose}>
      <div ref={ref} className={`${styles.modal} ${className}`} tabIndex={-1} onKeyDown={handleKeyDown}
           onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default React.forwardRef(Modal)