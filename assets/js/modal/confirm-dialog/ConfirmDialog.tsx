import styles from "./ConfirmDialog.scss?module"
import ModalHeader from "../modal-header/ModalHeader";
import ModalContent from "../modal-content/ModalContent";
import Button from "../../button/Button";
import React, {FC} from "react";
import Modal from "../Modal";


interface Props {
  onConfirm: () => void
  onClose: () => void
  children: any
}

const ConfirmDialog: FC<Props> = ({onConfirm, onClose, children}) => {

  return (
    <Modal className={styles.confirmDialog} onClose={onClose}>
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
