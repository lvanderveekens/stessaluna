import React, {FC, useEffect, useState} from "react"
import {useHistory, useParams} from "react-router-dom"
import {connect} from "react-redux"
import Modal from "../../modal/Modal"
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import Exercise, {ExerciseType} from "../../exercise/exercise.model";
import {createPost} from "../../store/post/actions";
import PostForm, {Values as PostValues} from "../post-form/PostForm";
import {State} from "../../store";
import Post from "../post.interface";
import AorbExerciseInputValues from "../post-form/exercise-input/aorb-exercise-input/aorb-exercise-input.model";
import {nextId} from "../../util/id-generator";


interface Props {
  findPost: (id: number) => Post
  onClose: () => void
  createPost: (channel: string, text?: string, image?: File, exercise?: Exercise) => Promise<void>
}


const EditPostModal: FC<Props> = ({findPost, onClose, createPost}) => {

  const history = useHistory()

  const {id} = useParams()
  const post = findPost(parseInt(id))

  const [initialValues, setInitialValues] = useState<PostValues>(null)

  useEffect( () => {
    if (post) {
      const initialValues = {
        channel: post.channel,
        text: post.text,
        image: null,
        exercise: post.exercise && mapToExerciseInputValue(post.exercise)
      } as PostValues

      if (post.image) {
        getImageFile(post.image).then((file) => setInitialValues({...initialValues, image: file}));
      } else {
        setInitialValues(initialValues)
      }
    }
  }, [post])

  // TODO: separate class?
  const mapToExerciseInputValue = (exercise: Exercise) => {
    switch (exercise.type) {
      case ExerciseType.A_OR_B:
        return new AorbExerciseInputValues(exercise.sentences.map((s) => ({...s, id: nextId()})))
      case ExerciseType.WHAT_DO_YOU_SEE:
        // TODO
        // return <WhatdoyouseeExerciseInputValue {...props} />
      case ExerciseType.MISSING_WORD:
        // TODO
        // return <MissingwordExerciseInputValue {...props} />
      default:
        throw new Error(`Cannot convert to unsupported exercise input type: ${exercise.type}`)
    }
  }

  const getImageFile = (imageUrl) => {
    const filename = post.image.substring(post.image.lastIndexOf('/') + 1);
    return fetch(post.image)
      .then(r => r.blob())
      .then(blobFile => new File([blobFile], filename, {type: "image/png"}));
  }

  const handleSubmit = ({channel, text, image, exercise}) => {
    // return createPost(channel, text, image, exercise)

    console.log(`channel ${JSON.stringify(initialValues.channel) !== JSON.stringify(channel)}`)
    console.log(`text ${JSON.stringify(initialValues.text) !== JSON.stringify(text)}`)
    console.log(`image ${initialValues.image !== image}`)
    console.log(`exercise ${JSON.stringify(initialValues.exercise) !== JSON.stringify(exercise)}`)

    return Promise.resolve()
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
  createPost,
}

export default connect(mapStateToProps, actionCreators)(EditPostModal)
