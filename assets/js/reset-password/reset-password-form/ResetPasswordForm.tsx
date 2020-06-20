import React, {FunctionComponent, useState} from 'react';
import {Alert, Form, FormControl} from 'react-bootstrap';
import {Formik} from 'formik';
import styles from "./ResetPasswordForm.scss?module";
import Button from "../../button/Button";
import {schema} from "./reset-password-form.schema";
import axios from '../../http/client';

interface Props {
}

interface FormValues {
  email: string
}

const ResetPasswordForm: FunctionComponent<Props> = ({}) => {

  const [alertMessage, setAlertMessage] = useState(null)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = ({email}: FormValues, {setSubmitting, resetForm}) => {
    setAlertMessage(null)
    setSubmitError(false)

    axios.post('/api/reset-password', {email})
      .then(() => {
        setAlertMessage(`A password reset link has been sent to ${email}.`)
        resetForm()
      })
      .catch((e) => {
        setAlertMessage(e.response.data.message)
        setSubmitError(true)
        setSubmitting(false)
      })
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "",
      }}
      onSubmit={handleSubmit}
      isInitialValid={false}
      validateOnChange={true}
      validateOnBlur={false}
    >
      {({values, handleSubmit, handleBlur, handleChange, isValid, isSubmitting, errors, touched}) => (
        <Form className={styles.resetPasswordForm} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <FormControl
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.email && touched.email}
            />
          </Form.Group>
          <Button className={styles.resetButton} type="submit" variant="light" disabled={!isValid || isSubmitting}>
            Reset
          </Button>
          {alertMessage && (
            <Alert
              className={styles.alert}
              variant={submitError ? "danger" : "success"}
              onClose={() => setAlertMessage(null)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
