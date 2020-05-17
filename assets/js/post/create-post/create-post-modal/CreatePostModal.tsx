import React, { FC } from "react"
import { useHistory } from "react-router-dom"
import CreatePostForm from "../create-post-form"
import Modal from "../../../modal/Modal"

interface Props {
  previousLocation?: Location
}

const CreatePostModal: FC<Props> = ({ previousLocation }) => {
  const history = useHistory()

  const handleClose = () => {
    console.log("ON CLICK")
    if (previousLocation) {
      history.push(previousLocation.pathname)
    } else {
      history.push("/")
    }
  }

  return (
    <Modal title="Create post" onClose={handleClose}>
      <CreatePostForm onCreated={handleClose} />
    </Modal>
  )
}

export default CreatePostModal
