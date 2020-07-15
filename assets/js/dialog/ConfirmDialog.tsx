import styles from "./ConfirmDialog.scss?module"
import ModalHeader from "../modal/modal-header/ModalHeader";
import ModalContent from "../modal/modal-content/ModalContent";
import Button from "../button/Button";
import React, {FC, useEffect, useRef} from "react";
import Modal from "../modal/Modal";


interface Props {
  onConfirm: () => void
  onClose: () => void
  children: any
}

const ConfirmDialog: FC<Props> = ({onConfirm, onClose, children}) => {

  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <Modal ref={ref} className={styles.confirmDialog} overlayClassName="align-items-center" onClose={onClose}>
      <ModalHeader onClose={onClose}>Confirm</ModalHeader>
      <ModalContent>
        {children}
        <div className={styles.confirmButtons}>
          <Button variant="dark" onClick={onClose}>Cancel</Button>
          <Button variant="light" onClick={onConfirm}>OK</Button>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDialog;
