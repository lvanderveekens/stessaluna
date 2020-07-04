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

interface Props {
  onClose: () => void
  createPost: (channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => Promise<void>
}


const CreatePostModal: FC<Props> = ({onClose, createPost}) => {
  const history = useHistory()

  const handleSubmit = ({channel, text, image, exercise}: PostValues) => {
    return createPost(channel, text, image, exercise)
      .then(() => history.push("/"))
  }

  return (
    <Modal onClose={onClose}>
      <ModalHeader onClose={onClose}>Create post</ModalHeader>
      <ModalContent className="h-100">
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
