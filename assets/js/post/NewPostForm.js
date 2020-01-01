import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './NewPostForm.scss?module'
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required("Name is a required field!"),
  text: yup.string().required("Text is a required field!"),
  file: yup.mixed(),
});

class NewPostForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleSubmit(values, { resetForm }) {
    const formData = new FormData();
    formData.append('userName', values.name);
    formData.append('text', values.text);
    formData.append('file', values.file);

    axios.post('/api/posts/', formData)
      .then(res => {
        console.log(res.data);
        this.reset(resetForm);
        this.props.fetchPosts();
      })
      .catch(error => {
        console.log(error)
      });
  }

  reset(resetForm) {
    resetForm();
    this.fileInput.current.value = null;
  }

  render() {
    return (
      <Fragment>
        <h3>New post</h3>
        <Formik
          validationSchema={schema}
          onSubmit={this.handleSubmit}
          initialValues={{ name: '', text: '', file: null}}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors, }) => (
            <Form className={styles.newPostForm} noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
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
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  isInvalid={!!errors.file}
                  ref={this.fileInput}
                  accept=".jpg,.png"
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Fragment>
    )
  }
}

NewPostForm.propTypes = {
  fetchPosts: PropTypes.func
};

export default NewPostForm