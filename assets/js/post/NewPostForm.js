import React, { Fragment, useState } from 'react';
import axios from '../axios/client';
import PropTypes from 'prop-types';
import styles from './NewPostForm.scss?module'
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const schema = yup.object({
  text: yup.string().required("Text is a required field!"),
  file: yup.mixed(),
});

const NewPostForm = ({ fetchPosts }) => {

  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('text', values.text);
    formData.append('image', values.image);

    // TODO: should dispatch addPost here
    axios.post('/api/posts/', formData)
      .then(res => {
        console.log(res.data);
        resetForm();
        fetchPosts();
      })
      .catch(console.log);
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
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="text"
                value={values.text}
                onChange={handleChange}
                isInvalid={!!errors.text}
              />
              <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="d-block">Image</Form.Label>
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
              />
              <Form.Label className={styles.imageUpload} htmlFor="image">
                <div className={styles.imageUploadBox}>
                  {values.image
                    ? (
                      <div className={styles.selectedImage} style={{ backgroundImage: `url(${imageUrl})` }} />
                    ) : (
                      <div>
                        <span className={styles.imageUploadIcon}><FontAwesomeIcon icon={faUpload} /></span>
                        Upload
                      </div>
                    )}
                </div>
              </Form.Label>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

NewPostForm.propTypes = {
  // TODO: connect to redux
  fetchPosts: PropTypes.func
};

export default NewPostForm;