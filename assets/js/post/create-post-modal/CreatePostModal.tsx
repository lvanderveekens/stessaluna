import React, { FC } from "react"
import Modal from "../../modal/Modal"
import NewPostForm from "../new-post/new-post-form"
import styles from "./CreatePostModal.scss?module"
import { useHistory } from "react-router-dom"

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
      <NewPostForm onCreated={handleClose} />
    </Modal>
  )
}

export default CreatePostModal
