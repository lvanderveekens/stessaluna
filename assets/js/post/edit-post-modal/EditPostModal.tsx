import React, {FC, useEffect, useState} from "react"
import {useHistory, useParams} from "react-router-dom"
import {connect} from "react-redux"
import Modal from "../../modal/Modal"
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import Exercise, {ExerciseType} from "../../exercise/exercise.model";
import {updatePost} from "../../store/post/actions";
import PostForm, {Values as PostValues} from "../post-form/PostForm";
import {State} from "../../store";
import Post from "../post.interface";
import AorbExerciseInputValues from "../post-form/exercise-input/aorb-exercise-input/aorb-exercise-input.model";
import {nextId} from "../../util/id-generator";
import ExerciseInputValues from "../post-form/exercise-input/exercise-input.model";
import Image from "../../image/image.interface";


interface Props {
  findPost: (id: number) => Post | null
  onClose: () => void
  updatePost: (id: number, channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => Promise<void>
}

const EditPostModal: FC<Props> = ({findPost, onClose, updatePost}) => {

  const history = useHistory()

  const {id} = useParams()
  const post = findPost(parseInt(id))

  const [initialValues, setInitialValues] = useState<PostValues>(null)

  useEffect( () => {
    if (post) {
      setInitialValues({
        channel: post.channel,
        text: post.text,
        image: post.image,
        exercise: post.exercise && mapToExerciseInputValue(post.exercise)
      })
    }
  }, [post])

  const mapToExerciseInputValue = (exercise: Exercise) => {
    switch (exercise.type) {
      case ExerciseType.A_OR_B:
        return new AorbExerciseInputValues(exercise.sentences.map((s) => ({...s, id: nextId()})))
      case ExerciseType.WHAT_DO_YOU_SEE:
      case ExerciseType.MISSING_WORD:
        return exercise
    }
  }

  const handleSubmit = ({channel, text, image, exercise}) => {
    return updatePost(id, channel, text, image, exercise)
      .then(() => history.push("/"))
  }

  return (
    <Modal onClose={onClose}>
      <ModalHeader onClose={onClose}>Edit post</ModalHeader>
      <ModalContent className="h-100">
        {initialValues && (
          <PostForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Save"/>
        )}
      </ModalContent>
    </Modal>
  )
}

const mapStateToProps = (state: State) => ({
  findPost: (id: number) => state.post.data.find((p) => p.id === id)
})

const actionCreators = {
  updatePost,
}

export default connect(mapStateToProps, actionCreators)(EditPostModal)
