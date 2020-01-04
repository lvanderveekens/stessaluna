import React, { Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

// TODO: create a loginform class? or simply rename
const LoginForm = () => {

  const schema = yup.object({
    username: yup.string().required("Username is a required field!"),
    password: yup.string().required("Password is a required field!"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const req = {
      username: values.username,
      password: values.password,
    }

    axios.post('/api/login', req)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('luna-app:jwt-token', res.data.token);
        resetForm();
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <Fragment>
      <h4>Login</h4>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{ username: '', password: '' }}
      >
        {({ handleSubmit, handleChange, values, errors, }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}

export default LoginForm;