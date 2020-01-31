import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './NewPostForm.scss?module';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faImage } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const schema = yup.object({
  text: yup.string().required("Message is missing."),
  file: yup.mixed(),
});

const NewPostForm = ({ user, createPost }) => {

  const fileInput = React.createRef();
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

  const handleImageChange = (setFieldValue) => (event) => {
    const image = event.currentTarget.files[0];
    if (image) {
      setFieldValue("image", image);
      setImageUrl(URL.createObjectURL(image));
    }
  };

  const handleDeleteImageClick = (setFieldValue) => (event) => {
    setFieldValue("image", null);
    fileInput.current.value = null;
  };

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
              <Form.Control
                className={styles.textInput}
                type="text"
                name="text"
                value={values.text}
                placeholder={user && `What's new, ${user.firstName}?`}
                onChange={handleChange}
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

NewPostForm.propTypes = {
  user: PropTypes.object,
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const actionCreators = {
  createPost,
};

export default connect(mapStateToProps, actionCreators)(NewPostForm);