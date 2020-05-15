import React, { FC } from "react"
import styles from "./CreatePostModal.scss?module"
import Modal from "../../modal/Modal"
import { Container, Row, Col } from "react-bootstrap"

interface Props {
  previousLocation?: Location
}

const CreatePostModal: FC<Props> = ({ previousLocation }) => {
  return (
    <Modal className={styles.createPostModal} previousLocation={previousLocation}>
      {/* <Container className={styles.content}>
        <Row className="justify-content-center"> */}
      <Col md={6} lg={6} xl={5}>
        Hallo!
      </Col>
      {/* </Row>
      </Container> */}
    </Modal>
  )
}

export default CreatePostModal
