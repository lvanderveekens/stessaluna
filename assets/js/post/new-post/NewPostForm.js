import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './NewPostForm.scss?module';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimesCircle, faImage } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const schema = yup.object({
  text: yup.string().required("Text is a required field!"),
  file: yup.mixed(),
});

const NewPostForm = ({ user, createPost }) => {

  const fileInput = React.createRef();

  const [imageUrl, setImageUrl] = useState("");
  const [imageHover, setImageHover] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    createPost(values.text, values.image, () => reset(values, resetForm));
  };

  const reset = (values, resetForm) => {
    if (values.image) {
      fileInput.current.value = null;
    }
    resetForm();
  };

  return (
    <Fragment>
      <h4>New post</h4>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{ text: '', image: null }}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors, }) => (
          <Form className={styles.newPostForm} noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <div className={styles.testWrapper}>
                <Form.Control
                  className={styles.textInput}
                  as="textarea"
                  type="text"
                  name="text"
                  value={values.text}
                  placeholder={user && `What's up, ${user.firstName}?`}
                  onChange={handleChange}
                  isInvalid={!!errors.text}
                />
                <div className={styles.imageUpload}>
                  <div
                    className={styles.imageUploadBox}
                    style={values.image
                      ? (imageHover
                        ? { backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${imageUrl}` }
                        : { backgroundImage: `url(${imageUrl})` })
                      : {}}
                    onMouseEnter={() => setImageHover(true)}
                    onMouseLeave={() => setImageHover(false)}
                  >
                    {values.image
                      ? (
                        imageHover && (
                          <div
                            className="btn"
                            onClick={() => {
                              setFieldValue("image", null);
                              fileInput.current.value = null;
                            }}
                          >
                            <span className="mr-2"><FontAwesomeIcon icon={faTimesCircle} /></span>
                            Remove
                          </div>
                        )
                      ) : (
                        <Form.Label className={styles.imageLabel} htmlFor="image">
                          <span className="mr-2"><FontAwesomeIcon icon={faImage} /></span>
                          Image 
                      </Form.Label>
                      )}
                  </div>
                </div>
              </div>
              {errors.text && (
                <div className={styles.error}>{errors.text}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                className={styles.imageInput}
                id="image"
                name="image"
                type="file"
                onChange={(event) => { 
                  const image = event.currentTarget.files[0];
                  if (image) {
                    setFieldValue("image", image);
                    setImageUrl(URL.createObjectURL(image));
                  }
                }}
                isInvalid={!!errors.file}
                accept=".jpg,.png"
                ref={fileInput}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
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