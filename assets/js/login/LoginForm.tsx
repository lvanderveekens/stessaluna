import React, { FunctionComponent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, FormikValues } from 'formik';
import * as yup from 'yup';
import styles from './LoginForm.scss?module';

interface Props {
  onSubmit: (values: FormValues) => void
}

export interface FormValues {
  username: string;
  password: string;
}

const LoginForm: FunctionComponent<Props> = ({ onSubmit }) => {

  const schema = yup.object({
    username: yup.string().required("Please fill in your username."),
    password: yup.string().required("Please fill in your password."),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{ username: '', password: '' }}
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
              isInvalid={errors.username && touched.username}
              onChange={handleChange}
              onBlur={handleBlur}
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
              isInvalid={errors.password && touched.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </Form.Group>
          <Button className="btn btn-dark" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
