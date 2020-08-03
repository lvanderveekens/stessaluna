import React, {FC, useEffect, useRef} from "react";
import Modal from "../../modal/Modal";
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import {useHistory} from "react-router-dom";
import Button from "../../button/Button";
import styles from "./LoginSignupModal.scss?module";


interface Props {
  onClose: () => void
}

const LoginSignupModal: FC<Props> = ({onClose}) => {

  const history = useHistory()

  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <Modal className={styles.loginSignupModal} ref={ref} onClose={onClose}>
      <ModalHeader onClose={onClose}>Not logged in</ModalHeader>
      <ModalContent>
        <div className="mb-3">Log in or sign up to answer exercises.</div>
        <div className="d-flex flex-column">
          <Button className={styles.loginButton} variant="transparent-dark" onClick={() => history.push("/login")}>
            Log in
          </Button>
          <div className={styles.divider}>
            <span className={styles.line}/>
            <span className={styles.text}>OR</span>
            <span className={styles.line}/>
          </div>
          <Button className={styles.signupButton} variant="light" onClick={() => history.push("/signup")}>
            Sign up
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default LoginSignupModal;
