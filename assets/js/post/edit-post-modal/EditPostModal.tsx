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
import Exercise from "../../exercise/exercise.model";


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
        exercise: mapToExerciseInput(post.exercise)
      })
    }
  }, [post])


  const mapToExerciseInput = (exercise: Exercise): ExerciseInputValues => {
    const exerciseInput = exercise
    delete exerciseInput.id
    delete exerciseInput.answerCount
    return exerciseInput;
  }

  const handleSubmit = ({channel, text, image, exercise}) => {

    // if exercise changed: show confirmation dialog that existing answers are going to be removed
    // todo: compare against initial values...
    // the aorb sentence id will probably fuck this comparison up.. because of ids
    if (JSON.stringify(initialValues.exercise) != JSON.stringify(exercise)) {
      console.log("THEY ARE DIFFERENT")
      console.log(JSON.stringify(initialValues.exercise))
      console.log(JSON.stringify(exercise))
    }

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
