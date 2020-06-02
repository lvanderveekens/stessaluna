import React, {FC, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import {Formik, FormikHelpers} from 'formik';
import styles from './LoginForm.scss?module';
import Button from '../../button/Button';
import {schema} from "./login-form.schema";

interface Props {
  onSubmit: (username: string, password: string) => Promise<void>
}

interface Values {
  username: string
  password: string
}

const LoginForm: FC<Props> = ({ onSubmit }) => {

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = ({username, password}: Values, {setSubmitting, resetForm}: FormikHelpers<Values>) => {
    setErrorMessage("")
    onSubmit(username, password)
      .then(() => {
        resetForm()
      })
      .catch((e) => {
        setErrorMessage(e.response.data.message)
        setSubmitting(false)
      })
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{ username: '', password: '' }}
      isInitialValid={false}
    >
      {({handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting, isValid}) => (
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
          <Button className={styles.submitButton} variant="light" type="submit" disabled={!isValid || isSubmitting}>
            Log in
          </Button>
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
