import React, {FC, useEffect, useState} from "react"
import {useHistory, useParams} from "react-router-dom"
import {connect} from "react-redux"
import Modal from "../../modal/Modal"
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import {updatePost} from "../../store/post/actions";
import PostForm, {Values as PostValues} from "../post-form/PostForm";
import {State} from "../../store";
import Post from "../post.interface";
import ExerciseInputValues from "../post-form/exercise-input/exercise-input.model";
import Image from "../../image/image.interface";
import {mapToExerciseInput} from "../post-form/exercise-input/exercise-input.helper";
import styles from './EditPostModal.scss?module'
import ConfirmDialog from "../../modal/confirm-dialog/ConfirmDialog";

interface Props {
  findPost: (id: number) => Post | null
  onClose: () => void
  updatePost: (id: number, channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => Promise<void>
}

const EditPostModal: FC<Props> = ({findPost, onClose, updatePost}) => {

  const [initialValues, setInitialValues] = useState<PostValues>(null)

  const [showExerciseUpdateConfirmDialog, setShowExerciseUpdateConfirmDialog] = useState(false)
  const [handleSubmitCallback, setHandleSubmitCallback] = useState<() => void>(null)
  const [cancelSubmitCallback, setCancelSubmitCallback] = useState<() => void>(null)

  const history = useHistory()

  const {id} = useParams()
  const post = findPost(parseInt(id))

  useEffect(() => {
    if (post) {
      setInitialValues({
        channel: post.channel,
        text: post.text,
        image: post.image,
        exercise: post.exercise && mapToExerciseInput(post.exercise)
      })
    }
  }, [post])

  const handleSubmit = (values: PostValues, onCancel: () => void, onError: (e) => void) => {
    const submit = ({channel, text, image, exercise}: PostValues, onError: (e) => void) => {
      return updatePost(id, channel, text, image, exercise)
        .then(() => history.push("/"))
        .catch(onError)
    }

    if (JSON.stringify(initialValues.exercise) != JSON.stringify(values.exercise)) {
      setHandleSubmitCallback(() => () => submit(values, onError))
      setCancelSubmitCallback(() => () => onCancel())
      setShowExerciseUpdateConfirmDialog(true)
    } else {
      submit(values, onError)
    }
  }

  const handleConfirmDialog = () => {
    handleSubmitCallback()
    setShowExerciseUpdateConfirmDialog(false)
  }

  const handleCloseDialog = () => {
    cancelSubmitCallback()
    setShowExerciseUpdateConfirmDialog(false)
  }

  if (!initialValues) {
    return null
  }

  return (
    <>
      <Modal className={styles.editPostModal} onClose={onClose}>
        <ModalHeader onClose={onClose}>Edit post</ModalHeader>
        <ModalContent className="h-100">
          <PostForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Save"/>
        </ModalContent>
      </Modal>
      {showExerciseUpdateConfirmDialog && (
        <ConfirmDialog onConfirm={handleConfirmDialog} onClose={handleCloseDialog}>
          <p>By updating the exercise you invalidate all existing answers.</p>
          <p>Are you sure?</p>
        </ConfirmDialog>
      )}
    </>
  )
}

const mapStateToProps = (state: State) => ({
  findPost: (id: number) => state.post.data.find((p) => p.id === id)
})

const actionCreators = {
  updatePost,
}

export default connect(mapStateToProps, actionCreators)(EditPostModal)
