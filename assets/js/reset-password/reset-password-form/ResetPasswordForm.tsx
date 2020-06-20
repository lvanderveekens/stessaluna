import React, {FunctionComponent, useState} from 'react';
import {Alert, Form, FormControl} from 'react-bootstrap';
import {Formik} from 'formik';
import styles from "./ResetPasswordForm.scss?module";
import Button from "../../button/Button";
import {schema} from "./reset-password-form.schema";

interface Props {
}

interface FormValues {
  email: string
}

const ResetPasswordForm: FunctionComponent<Props> = ({}) => {

  const [alertMessage, setAlertMessage] = useState(null)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = (values: FormValues, {resetForm}) => {
    setAlertMessage(null)
    setSubmitError(false)

    // updateProfile(country, resetAvatar, avatar, displayName)
    //   .then(() => {
    //     setAlertMessage("Profile saved")
    //     resetForm()
    //   })
    //   .catch((error) => {
    //     setAlertMessage(error)
    //     setSubmitError(true)
    //   })
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "",
      }}
      onSubmit={handleSubmit}
      isInitialValid={false}
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
