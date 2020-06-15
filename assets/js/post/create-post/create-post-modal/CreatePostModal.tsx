import React, { FC } from "react"
import { useHistory } from "react-router-dom"
import CreatePostForm from "../create-post-form"
import Modal from "../../../modal/Modal"
import ModalHeader from "../../../modal/modal-header/ModalHeader";
import ModalContent from "../../../modal/modal-content/ModalContent";

interface Props {
  previousLocation?: Location
}

const CreatePostModal: FC<Props> = ({ previousLocation }) => {
  const history = useHistory()

  const handleClose = () => {
    if (previousLocation) {
      history.push(previousLocation.pathname)
    } else {
      history.push("/")
    }
  }

  const handleCreated = () => history.push("/")

  return (
    <Modal onClose={handleClose}>
      <ModalHeader onClose={handleClose}>Create post</ModalHeader>
      <ModalContent className="h-100">
        <CreatePostForm onCreated={handleCreated}/>
      </ModalContent>
    </Modal>
  )
}

export default CreatePostModal
