import React, { FC, useRef, useState, Fragment } from 'react';
import * as yup from 'yup';
import User from '../../../user/user.interface';
import { NewTextPost as NewTextPostInterface } from './new-text-post.interface';
import { Spinner } from 'react-bootstrap';

const schema = yup.object({
  text: yup.string(),
  file: yup.mixed(),
});

interface Props {
  user: User
  createPost: (post: NewTextPostInterface) => Promise<void>
  onExercise: () => void
}

const TextInput: FC<Props> = ({ user, createPost, onExercise }) => {

  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (values, { resetForm }) => {
    setErrorMessage("");

    createPost(new NewTextPostInterface(values.text, values.image))
      .then(() => {
        if (values.image) {
          fileInput.current.value = null;
        }
        resetForm();
      })
      .catch((error) => setErrorMessage(error.response.data.detail));
  };

  return (
    <Fragment>
      {!user
        ? <Spinner animation="border" variant="warning" />
        : (
          <Fragment>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
          </Fragment>
        )}
    </Fragment>
  );
};

export default TextInput;