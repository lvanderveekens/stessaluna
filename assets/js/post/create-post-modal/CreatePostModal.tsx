import React, { FC, useEffect } from "react"
import styles from "./CreatePostModal.scss?module"
import Modal from "./Modal"
import ImagePreview from "../new-post/new-post-form/image-preview/ImagePreview"

interface Props {
  previousLocation?: Location
}

const CreatePostModal: FC<Props> = ({ previousLocation }) => {
  return (
    <Modal className={styles.createPostModal} previousLocation={previousLocation}>
      Hallo!
    </Modal>
  )
}

export default CreatePostModal
