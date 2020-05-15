import React, { FC } from "react"
import { connect } from "react-redux"
import Exercise from "../../../exercise/exercise.model"
import { createPost } from "../../../store/post/actions"
import NewPostForm from "./NewPostForm"

interface Props {
  onCreated: () => void
  createPost: (text?: string, image?: File, exercise?: Exercise) => Promise<void>
}

const NewPostFormContainer: FC<Props> = ({ onCreated, createPost }) => {
  const handleSubmit = (text?: string, image?: File, exercise?: Exercise) => {
    console.log("submitting...")
    console.log({ text, image, exercise })
    return createPost(text, image, exercise).then(() => onCreated())
  }

  return <NewPostForm onSubmit={handleSubmit} />
}

const actionCreators = {
  createPost,
}

export default connect(null, actionCreators)(NewPostFormContainer)
