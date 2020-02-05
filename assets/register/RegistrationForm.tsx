import React, { FunctionComponent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './RegistrationForm.scss?module';

interface Props {
  onSubmit: (values: FormValues) => void
}

interface FormValues {
  username: string
  password: string
  confirmPassword: string
}

const RegistrationForm: FunctionComponent<Props> = ({ onSubmit }) => {

  const schema = yup.object({
    username: yup.string().required("Please fill in your username."),
    password: yup.string().required("Please fill in your password."),
    confirmPassword: yup.string().required("Please fill in your password another time."),
  });

  // TODO: onSubmit check if username already exists...
  // TODO: check if passwords match

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{ username: '', password: '', confirmPassword: ''}}
      validateOnChange={false}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
        <Form noValidate className={styles.loginForm} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.username && touched.username}
            />
            {errors.username && touched.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.password && touched.password}
            />
            {errors.password && touched.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.confirmPassword && touched.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
