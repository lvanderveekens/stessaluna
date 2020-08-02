import React, {FC, useEffect, useRef} from "react";
import Modal from "../../modal/Modal";
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";


interface Props {
  onClose: () => void
}

const LoginSignupModal: FC<Props> = ({onClose}) => {

  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <Modal ref={ref} onClose={onClose}>
      <ModalHeader onClose={onClose}>Not logged in</ModalHeader>
      <ModalContent>Log in or sign up to answer this exercise.</ModalContent>
    </Modal>
  )
}

export default LoginSignupModal;
