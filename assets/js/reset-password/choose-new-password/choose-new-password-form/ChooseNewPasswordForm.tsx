import React, {FunctionComponent, useState} from 'react';
import {Alert, Form, FormControl} from 'react-bootstrap';
import {Formik} from 'formik';
import styles from "./ChooseNewPasswordForm.scss?module";
import Button from "../../../button/Button";
import {schema} from "./schema";
import axios from '../../../http/client';
import {Link} from "react-router-dom";
const queryString = require('query-string');

interface Props {
}

interface FormValues {
  newPassword: string
  confirmNewPassword: string
}

const ChooseNewPasswordForm: FunctionComponent<Props> = ({}) => {

  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const {token} = queryString.parse(location.search);

  const handleSubmit = ({newPassword}: FormValues, {setSubmitting, resetForm}) => {
    setSubmitSuccess(false)
    setSubmitError(null)

    axios.post('/api/reset-password/reset', {token, newPassword})
      .then(() => {
        setSubmitSuccess(true)
        resetForm()
      })
      .catch((e) => {
        setSubmitError(e.response.data.message)
        setSubmitting(false)
      })
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        newPassword: "",
        confirmNewPassword: "",
      }}
      onSubmit={handleSubmit}
      isInitialValid={false}
      validateOnChange={true}
      validateOnBlur={false}
    >
      {({values, handleSubmit, handleBlur, handleChange, isValid, isSubmitting, errors, touched}) => (
        <Form className={styles.chooseNewPasswordForm} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="newPassword">New password</Form.Label>
            <FormControl
              type="password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.newPassword && touched.newPassword}
            />
            <div className={styles.feedbackWrapper}>
              {errors.newPassword && touched.newPassword && (<div className="invalid-feedback">{errors.newPassword}</div>)}
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="confirmNewPassword">Confirm new password</Form.Label>
            <FormControl
              type="password"
              name="confirmNewPassword"
              value={values.confirmNewPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.confirmNewPassword && touched.confirmNewPassword}
            />
            <div className={styles.feedbackWrapper}>
              {errors.confirmNewPassword && touched.confirmNewPassword && (<div className="invalid-feedback">{errors.confirmNewPassword}</div>)}
            </div>
          </Form.Group>
          <Button className={styles.submitButton} type="submit" variant="light" disabled={!isValid || isSubmitting}>
            Reset
          </Button>
          {submitSuccess && (
            <Alert className={styles.alert} variant="success" onClose={() => setSubmitSuccess(false)} dismissible>
              Your password has been reset successfully! <Alert.Link as={Link} to="/login">Click here</Alert.Link> to
              go to the login page.
            </Alert>
          )}
          {submitError && (
            <Alert className={styles.alert} variant="danger" onClose={() => setSubmitError(null)} dismissible>
              {submitError}
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ChooseNewPasswordForm;
