import React, { Fragment, useState, FC, useRef } from 'react';
import styles from './NewPostForm.scss?module';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faImage } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import User from '../../user/user.interface';
import TextareaAutosize from 'react-textarea-autosize';

const schema = yup.object({
  text: yup.string().required("Message is missing."),
  file: yup.mixed(),
});

interface Props {
  user?: User
  createPost: (text: string, image: string, any) => void
}

const NewPostForm: FC<Props> = ({ user, createPost }) => {

  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (values, { resetForm }) => {
    createPost(values.text, values.image, () => reset(values, resetForm));
  };

  const reset = (values, resetForm) => {
    if (values.image) {
      fileInput.current.value = null;
    }
    resetForm();
  };

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
  }

  return (
    <Fragment>
      <h4>New post</h4>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{ text: '', image: null }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors, }) => (
          <Form className={styles.newPostForm} noValidate onSubmit={handleSubmit}>
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
                <Form.Label className={styles.imageLabel} htmlFor="image">
                  <span className="mr-2"><FontAwesomeIcon icon={faImage} /></span>
                  Image
                </Form.Label>
              </div>
            </div>
            <Button className="btn btn-dark mb-2" type="submit">Create</Button>
            {errors.text && (
              <div className={styles.error}>{errors.text}</div>
            )}
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const actionCreators = {
  createPost,
};

export default connect(mapStateToProps, actionCreators)(NewPostForm);