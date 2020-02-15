import React, { FC, useRef, useState, Fragment } from 'react';
import * as yup from 'yup';
import User from '../../../user/user.interface';
import TextareaAutosize from 'react-textarea-autosize';
import { faTimesCircle, faImage, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import styles from './NewTextPost.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { createPost } from '../../actions';

const schema = yup.object({
  text: yup.string(),
  file: yup.mixed(),
});

interface Props {
  user?: User
  createPost: (text: string, image: string) => Promise<void>
  onExercise: () => void
}

const NewTextPost: FC<Props> = ({ user, createPost, onExercise }) => {

  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleImageChange = (setFieldValue) => (e) => {
    const image = e.currentTarget.files[0];
    if (image) {
      setFieldValue("image", image);
      setImageUrl(URL.createObjectURL(image));
    }
  };

  const handleDeleteImageClick = (setFieldValue) => (e) => {
    setFieldValue("image", null);
    fileInput.current.value = null;
  };

  const handleKeyDown = (submit: () => void) => (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      submit();
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    setErrorMessage("");

    createPost(values.text, values.image)
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
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{ text: '', image: null }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleSubmit, handleChange, setFieldValue, values }) => (
          <Form className={styles.newPost} noValidate onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <TextareaAutosize
                className={`${styles.textInput} form-control`}
                type="text"
                name="text"
                value={values.text}
                placeholder={user && `What's new, ${user.username}?`}
                onChange={handleChange}
                onKeyDown={handleKeyDown(handleSubmit)}
              />
              <Form.Control
                className={styles.imageInput}
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange(setFieldValue)}
                accept=".jpg,.png"
                ref={fileInput}
              />
              {values.image && (
                <div className={styles.images}>
                  <div className={styles.imageContainer}>
                    <div className={styles.aspectRatioBox}>
                      <img src={imageUrl} />
                      <div className={styles.imageOverlay}>
                        <span className={styles.deleteButton} onClick={handleDeleteImageClick(setFieldValue)}>
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.attachments}>
                <Form.Label htmlFor="image">
                  <span><FontAwesomeIcon icon={faImage} />Image</span>
                </Form.Label>
                <span onClick={onExercise}><FontAwesomeIcon icon={faGraduationCap} />Exercise</span>
              </div>
            </div>
            <Button className="btn btn-dark mb-2" type="submit">Create</Button>
          </Form>
        )}
      </Formik>
      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const actionCreators = {
  createPost,
};

export default connect(mapStateToProps, actionCreators)(NewTextPost);