import React, {FC} from "react"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import Modal from "../../modal/Modal"
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import {createPost} from "../../store/post/actions";
import PostForm, {Values as PostValues} from "../post-form/PostForm";
import ExerciseInputValues from "../post-form/exercise-input/exercise-input.model";
import Image from "../../image/image.interface";
import styles from './CreatePostModal.scss?module'

interface Props {
  onClose: () => void
  createPost: (channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => Promise<void>
}


const CreatePostModal: FC<Props> = ({onClose, createPost}) => {
  const history = useHistory()

  const handleSubmit = ({channel, text, image, exercise}: PostValues, onCancel, onError) => {
    createPost(channel, text, image, exercise)
      .then(() => history.push("/"))
      .catch(onError)
  }

  return (
    <Modal className={styles.createPostModal} onClose={onClose}>
      <ModalHeader onClose={onClose}>Create a post</ModalHeader>
      <ModalContent>
        <PostForm
          initialValues={{channel: null, text: null, image: null, exercise: null}}
          onSubmit={handleSubmit}
          submitLabel="Create"
        />
      </ModalContent>
    </Modal>
  )
}

const actionCreators = {
  createPost,
}

export default connect(null, actionCreators)(CreatePostModal)
