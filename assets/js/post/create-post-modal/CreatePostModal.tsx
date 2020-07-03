import React, {FC} from "react"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import Modal from "../../modal/Modal"
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import Exercise from "../../exercise/exercise.model";
import {createPost} from "../../store/post/actions";
import PostForm from "../post-form/PostForm";

interface Props {
  onClose: () => void
  createPost: (channel: string, text?: string, image?: File, exercise?: Exercise) => Promise<void>
}


const CreatePostModal: FC<Props> = ({onClose, createPost}) => {
  const history = useHistory()

  const handleSubmit = ({channel, text, image, exercise}) => {
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
