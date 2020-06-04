import React, {FunctionComponent, useState} from 'react';
import {Alert, Form} from 'react-bootstrap';
import {Formik, FormikHelpers} from 'formik';
import {CountryDropdown} from 'react-country-region-selector';
import {schema} from "./registration-form.schema";
import styles from "./RegistrationForm.scss?module";
import ReactCountryFlag from "react-country-flag"
import Button from "../../button/Button";

interface Props {
  onSubmit: (email: string, username: string, password: string, country: string) => Promise<void>
}

interface Values {
  email: string
  username: string
  password: string
  confirmPassword: string
  country: string
}

const RegistrationForm: FunctionComponent<Props> = ({ onSubmit }) => {

  const [alertMessage, setAlertMessage] = useState(null)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = ({email, username, password, country}: Values, {setSubmitting, resetForm}: FormikHelpers<Values>) => {
    setAlertMessage(null)
    setSubmitError(false)

    onSubmit(email, username, password, country)
      .then(() => {
        // TODO: link to login page
        setAlertMessage("Successfully registered")
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
      onSubmit={handleSubmit}
      initialValues={{email: '', username: '', password: '', confirmPassword: '', country: ''}}
      isInitialValid={false}
    >
      {({handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue, isValid, isSubmitting}) => (
        <Form className={styles.registrationForm} noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.email && touched.email}
            />
            <div className={styles.feedbackWrapper}>
              {errors.email && touched.email && (<div className="invalid-feedback">{errors.email}</div>)}
            </div>
          </Form.Group>
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
            <div className={styles.feedbackWrapper}>
              {errors.username && touched.username && (<div className="invalid-feedback">{errors.username}</div>)}
            </div>
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
            <div className={styles.feedbackWrapper}>
              {errors.password && touched.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
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
            <div className={styles.feedbackWrapper}>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
          </Form.Group>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <div className={`d-flex align-items-center ${errors.country && touched.country ? 'is-invalid' : ''}`}>
              <CountryDropdown
                classes={`form-control ${errors.country && touched.country ? 'is-invalid' : ''}`}
                name="country"
                valueType="short"
                value={values.country}
                onChange={(value) => setFieldValue('country', value)}
                onBlur={handleBlur}
              />
              {values.country && (
                <ReactCountryFlag
                  className="ml-2"
                  style={{width: "2rem", height: "2rem"}}
                  countryCode={values.country}
                  svg
                />
              )}
            </div>
            <div className={styles.feedbackWrapper}>
              {errors.country && touched.country && (<div className="invalid-feedback">{errors.country}</div>)}
            </div>
          </div>
          <Button className={styles.submitButton} type="submit" variant="light" disabled={!isValid || isSubmitting}>
            Sign up
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

export default RegistrationForm;
