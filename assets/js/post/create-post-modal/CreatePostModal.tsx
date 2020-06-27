import React, { FC } from "react"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import Modal from "../../modal/Modal"
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import Exercise from "../../exercise/exercise.model";
import {createPost} from "../../store/post/actions";
import PostForm from "../post-form/PostForm";

interface Props {
  previousLocation?: Location
  createPost: (channel: string, text?: string, image?: File, exercise?: Exercise) => Promise<void>
}


const CreatePostModal: FC<Props> = ({previousLocation, createPost}) => {
  const history = useHistory()

  const handleClose = () => {
    if (previousLocation) {
      history.push(previousLocation.pathname)
    } else {
      history.push("/")
    }
  }

  const handleSubmit = ({channel, text, image, exercise}) => {
    return createPost(channel, text, image, exercise)
      .then(() => history.push("/"))
  }

  return (
    <Modal onClose={handleClose}>
      <ModalHeader onClose={handleClose}>Create post</ModalHeader>
      <ModalContent className="h-100">
        <PostForm
          initialValues={{channel: null, text: null, image: null, exercise: null}}
          onSubmit={handleSubmit}
        />
      </ModalContent>
    </Modal>
  )
}

const actionCreators = {
  createPost,
}

export default connect(null, actionCreators)(CreatePostModal)
