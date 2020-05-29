import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import React, {FC} from "react";
import styles from './ModalHeader.scss?module'

interface Props {
  children: any
  onClose: () => void
}

const ModalHeader: FC<Props> = ({children, onClose}) => {

  return (
    <div className={styles.modalHeader}>
      <span>{children}</span>
      <span className={styles.closeIcon} onClick={onClose}>
        <FontAwesomeIcon icon={faTimes}/>
      </span>
    </div>
  )
}

export default ModalHeader