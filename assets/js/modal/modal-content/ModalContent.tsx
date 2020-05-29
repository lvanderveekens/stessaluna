import React, {FC, useEffect, useRef} from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import styles from "./ModalContent.scss?module";

interface Props {
  className?: string
  children: any
}

const ModalContent: FC<Props> = ({className, children}) => {

  const modalContentRef = useRef(null)

  useEffect(() => {
    disableBodyScroll(modalContentRef.current)
    return () => {
      enableBodyScroll(modalContentRef.current)
    }
  }, [])

  return (
    <div ref={modalContentRef} className={`${styles.modalContent} ${className}`}>{children}</div>
  )
}

export default ModalContent