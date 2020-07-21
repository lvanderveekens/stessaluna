import React, {FC, useEffect, useRef, useState} from "react"
import {useHistory, useParams} from "react-router-dom"
import {connect} from "react-redux"
import {updatePost} from "../../store/post/actions";
import PostModalForm, {Values as PostValues} from "../post-modal-form/PostModalForm";
import {State} from "../../store";
import Post from "../post.interface";
import ExerciseInputValues from "../post-modal-form/exercise-input/exercise-input.model";
import Image from "../../image/image.interface";
import {mapToExerciseInput} from "../post-modal-form/exercise-input/exercise-input.helper";
import ConfirmDialog from "../../dialog/ConfirmDialog";

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

  const modalRef = useRef(null)

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

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus({preventScroll: true})
    }
  }, [initialValues])

  const handleSubmit = (values: PostValues, onCancel: () => void, onError: (e) => void) => {
    const submit = ({channel, text, image, exercise}: PostValues, onError: (e) => void) => {
      return updatePost(id, channel, text, image, exercise)
        .then(() => history.push("/"))
        .catch(onError)
    }


    if (post.exercise && post.exercise.answerCount && JSON.stringify(initialValues.exercise) != JSON.stringify(values.exercise)) {
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
    modalRef.current.focus({preventScroll: true})
  }

  if (!initialValues) {
    return null
  }

  return (
    <>
      <PostModalForm
        ref={modalRef}
        initialValues={initialValues}
        headerText="Edit post"
        onSubmit={handleSubmit}
        submitText="Save"
        onClose={onClose}
      />
      {showExerciseUpdateConfirmDialog && (
        <ConfirmDialog onConfirm={handleConfirmDialog} onClose={handleCloseDialog}>
          <p>By changing the exercise you invalidate all existing answers.</p>
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
