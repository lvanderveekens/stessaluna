import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './RegistrationForm.scss?module';

const RegistrationForm = ({ }) => {

  const schema = yup.object({
    // username: yup.string().required("Username is a required field!"),
  });


  // TODO: onSubmit check if username already exists...

  return (
    <Formik
      validationSchema={schema}
      onSubmit={() => { }}
      initialValues={{ username: '', password: '', confirmPassword: ''}}
    >
      {({ handleSubmit, handleChange, values, errors, }) => (
        <Form noValidate className={styles.loginForm} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
