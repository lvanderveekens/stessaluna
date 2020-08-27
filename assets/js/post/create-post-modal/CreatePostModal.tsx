import React, {FC, useEffect, useRef} from "react"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import {createPost} from "../state/post.actions";
import PostModalForm, {Values as PostValues} from "../post-modal-form/PostModalForm";
import ExerciseInputValues from "../post-modal-form/exercise-input/exercise-input.model";
import Image from "../../image/image.interface";

interface Props {
  onClose: () => void
  createPost: (channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => Promise<void>
}


const CreatePostModal: FC<Props> = ({onClose, createPost}) => {
  const history = useHistory()
  const modalRef = useRef(null)

  useEffect(() => {
    modalRef.current.focus({preventScroll: true})
  }, [])

  const handleSubmit = ({channel, text, image, exercise}: PostValues, onCancel, onError) => {
    createPost(channel, text, image, exercise)
      .then(() => history.push("/"))
      .catch(onError)
  }

  return (
    <PostModalForm
      ref={modalRef}
      initialValues={{channel: null, text: null, image: null, exercise: null}}
      headerText="Create post"
      onSubmit={handleSubmit}
      submitText="Create"
      onClose={onClose}
    />
  )
}

const actionCreators = {
  createPost,
}

export default connect(null, actionCreators)(CreatePostModal)
