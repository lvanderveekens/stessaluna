import React, { FC } from "react"
import { connect } from "react-redux"
import Exercise from "../../../exercise/exercise.model"
import { createPost } from "../../../store/post/actions"
import CreatePostForm from "./CreatePostForm"

interface Props {
  onCreated: () => void
  createPost: (channel: string, text?: string, image?: File, exercise?: Exercise) => Promise<void>
}

const CreatePostFormContainer: FC<Props> = ({ onCreated, createPost }) => {
  const handleSubmit = (channel: string, text?: string, image?: File, exercise?: Exercise) => {
    console.log("submitting...")
    console.log({ channel, text, image, exercise })
    return createPost(channel, text, image, exercise).then(() => onCreated())
  }

  return <CreatePostForm onSubmit={handleSubmit} />
}

const actionCreators = {
  createPost,
}

export default connect(null, actionCreators)(CreatePostFormContainer)
