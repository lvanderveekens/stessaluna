import React, {FC, useEffect, useState} from "react"
import {useHistory, useParams} from "react-router-dom"
import {connect} from "react-redux"
import Modal from "../../modal/Modal"
import ModalHeader from "../../modal/modal-header/ModalHeader";
import ModalContent from "../../modal/modal-content/ModalContent";
import Exercise from "../../exercise/exercise.model";
import {createPost} from "../../store/post/actions";
import PostForm from "../post-form/PostForm";
import {State} from "../../store";
import Post from "../post.interface";


interface Props {
  findPost: (id: number) => Post
  onClose: () => void
  createPost: (channel: string, text?: string, image?: File, exercise?: Exercise) => Promise<void>
}


const EditPostModal: FC<Props> = ({findPost, onClose, createPost}) => {

  const history = useHistory()

  const {id} = useParams()
  const post = findPost(parseInt(id))

  const [initialValues, setInitialValues] = useState(null)

  useEffect(() => {
    if (post) {
      const initialValues = {channel: post.channel, text: post.text, image: null, exercise: null}
      if (post.image) {
        const filename = post.image.substring(post.image.lastIndexOf('/')+1);
        fetch(post.image)
          .then(r => r.blob())
          .then(blobFile => {
            setInitialValues({...initialValues, image: new File([blobFile], filename, {type: "image/png"})})
          });
      } else {
        setInitialValues(initialValues)
      }
    }
  }, [post])

  const handleSubmit = ({channel, text, image, exercise}) => {
    console.log({channel, text, image, exercise})
    // return createPost(channel, text, image, exercise)
    //   .then(() => history.push("/"))
    return Promise.resolve()
  }

  return (
    <Modal onClose={onClose}>
      <ModalHeader onClose={onClose}>Edit post</ModalHeader>
      <ModalContent className="h-100">
        {initialValues && (
          <PostForm initialValues={initialValues} onSubmit={handleSubmit}/>
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
