import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit }) => {

  const schema = yup.object({
    username: yup.string().required("Username is a required field!"),
    password: yup.string().required("Password is a required field!"),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
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
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
