import React, {FunctionComponent, useState} from 'react';
import {Alert, Form} from 'react-bootstrap';
import {Formik, FormikHelpers} from 'formik';
import {CountryDropdown} from 'react-country-region-selector';
import {schema} from "./registration-form.schema";
import styles from "./RegistrationForm.scss?module";
import ReactCountryFlag from "react-country-flag"
import Button from "../../button/Button";
import {Link} from "react-router-dom"
import ReactGA from "react-ga";

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

  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = ({email, username, password, country}: Values, {setSubmitting, resetForm}: FormikHelpers<Values>) => {
    setSubmitSuccess(false)
    setSubmitError(null)

    onSubmit(email, username, password, country)
      .then(() => {
        setSubmitSuccess(true)
        resetForm()
        ReactGA.event({category: 'User', action: 'Created an account'});
      })
      .catch((e) => {
        setSubmitError(e.response.data.message)
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
          {submitSuccess && (
            <Alert className={styles.alert} variant="success" onClose={() => setSubmitSuccess(false)} dismissible>
              Registration successful. <Alert.Link as={Link} to="/login">Click here</Alert.Link> to go to the login
              page.
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

export default RegistrationForm;
