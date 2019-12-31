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
});

class NewPostForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, { resetForm }) {
    const { name, text } = values;
    axios.post('/api/posts/', { userName: name, text: text })
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    this.props.fetchPosts()
    resetForm()
  }

  render() {
    return (
      <Fragment>
        <h3>New</h3>
        <Formik
          validationSchema={schema}
          onSubmit={this.handleSubmit}
          initialValues={{ name: '', text: '', }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
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