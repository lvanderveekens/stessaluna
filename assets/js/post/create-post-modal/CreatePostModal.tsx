import React, { FC } from "react"
import { Modal } from "react-bootstrap"
import { useHistory } from "react-router-dom"

interface Props {
  previousLocation?: Location
}

const CreatePostModal: FC<Props> = ({ previousLocation }) => {
  const history = useHistory()

  const handleHide = () => {
    if (previousLocation) {
      history.push(previousLocation.pathname)
    } else {
      history.push("/")
    }
  }

  return (
    <Modal show keyboard centered onHide={handleHide}>
      Hallo!
    </Modal>
  )
}

export default CreatePostModal
