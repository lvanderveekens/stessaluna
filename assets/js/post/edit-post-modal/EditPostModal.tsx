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
import Button from "../../button/Button";

interface Props {
  findPost: (id: number) => Post | null
  onClose: () => void
  updatePost: (id: number, channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => Promise<void>
}

const EditPostModal: FC<Props> = ({findPost, onClose, updatePost}) => {

  const [initialValues, setInitialValues] = useState<PostValues>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(true)

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


  const handleSubmit = ({channel, text, image, exercise}) => {

    // if exercise changed: show confirmation dialog that existing answers are going to be removed
    if (JSON.stringify(initialValues.exercise) != JSON.stringify(exercise)) {
      console.log("THEY ARE DIFFERENT")
      console.log(JSON.stringify(initialValues.exercise))
      console.log(JSON.stringify(exercise))
    }

    setShowConfirmDialog(true)
    // return updatePost(id, channel, text, image, exercise)
    //   .then(() => history.push("/"))
    return Promise.resolve()
  }

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false)
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
      {/* TODO: rename boolean to better reflect what we're warning the user about */}
      {showConfirmDialog && (
        <Modal className={styles.confirmDialog} onClose={closeConfirmDialog}>
          <ModalHeader onClose={closeConfirmDialog}>Confirm</ModalHeader>
          <ModalContent>
            <p>By updating the exercise you invalidate all existing answers.</p>
            <p>Are you sure?</p>
            <div className={styles.confirmButtons}>
              <Button variant="dark" onClick={() => console.log("TODO: perform submit")}>Yes</Button>
              <Button variant="dark" onClick={closeConfirmDialog}>No</Button>
            </div>
          </ModalContent>
        </Modal>
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
