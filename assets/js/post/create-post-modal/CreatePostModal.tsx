import React, { FC } from "react"
import Modal from "../../modal/Modal"
import NewPostForm from "../new-post/new-post-form"
import styles from "./CreatePostModal.scss?module"

interface Props {
  previousLocation?: Location
}

const CreatePostModal: FC<Props> = ({ previousLocation }) => {
  return (
    <Modal title="Create post" previousLocation={previousLocation}>
      <NewPostForm />
    </Modal>
  )
}

export default CreatePostModal
