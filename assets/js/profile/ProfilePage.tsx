import {Formik} from "formik"
import React, {FC, useState} from "react"
import {Alert, Col, Container, Row, Spinner} from "react-bootstrap"
import ReactCountryFlag from "react-country-flag"
import {CountryDropdown} from "react-country-region-selector"
import {connect} from "react-redux"
import Navbar from "../nav/Navbar"
import {State} from "../store"
import User from "../user/user.interface"
import styles from "./ProfilePage.scss?module"
import Button from "../button/Button"
import {COLUMN_BREAKPOINTS} from "../config/column-breakpoints";
import Image from "../image/image.interface";
import ImageInput from "../image/image-input/ImageInput";
import {updateCurrentUser} from "../user/state/user.actions";

interface Props {
  loading: boolean
  user?: User
  updateCurrentUser: (country: string, avatar?: Image, displayName?: string) => Promise<void>
}

interface FormValues {
  displayName?: string
  country: string
  avatar: Image
}

const ProfilePage: FC<Props> = ({ loading, user, updateCurrentUser }) => {
  const [alertMessage, setAlertMessage] = useState(null)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = (values, { resetForm }) => {
    const { displayName, country, avatar } = values
    setAlertMessage(null)
    setSubmitError(false)

    updateCurrentUser(country, avatar, displayName)
      .then(() => {
        setAlertMessage("Profile saved")
        resetForm()
      })
      .catch((error) => {
        setAlertMessage(error)
        setSubmitError(true)
      })
  }

  return (
    <div className={styles.profilePage}>
      <Navbar pageTitle="Profile" />
      <Container className={styles.content}>
        {loading && (
          <span className={styles.spinner}>
            <Spinner animation="border" />
          </span>
        )}
        <Row className="justify-content-center">
          <Col className={styles.centered} {...COLUMN_BREAKPOINTS}>
            <h4>Profile</h4>
            {user && (
              <Formik
                initialValues={{
                  displayName: user.displayName || "",
                  country: user.country,
                  avatar: user.avatar,
                } as FormValues}
                enableReinitialize
                onSubmit={handleSubmit}
              >
                {({values, setFieldValue, handleSubmit, handleChange, isValid, isSubmitting, dirty}) => (
                  <form className="mb-3" onSubmit={handleSubmit}>
                    <div className={styles.avatar}>
                      <div className={styles.imageWrapper}>
                        <label htmlFor="avatar">
                          <img src={values.avatar.url}/>
                        </label>
                      </div>
                    </div>
                    <ImageInput id="avatar" onChange={(image) => setFieldValue("avatar", image)}/>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        value={user.email}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        name="username"
                        type="text"
                        className="form-control"
                        value={user.username}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="displayName">Display name (optional)</label>
                      <input
                        name="displayName"
                        type="text"
                        className="form-control"
                        value={values.displayName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <div className="d-flex align-items-center">
                        <CountryDropdown
                          classes="form-control"
                          name="country"
                          valueType="short"
                          showDefaultOption={false}
                          value={values.country}
                          onChange={(value) => setFieldValue("country", value)}
                        />
                        <ReactCountryFlag
                          className="ml-2"
                          style={{ width: "2rem", height: "2rem" }}
                          countryCode={values.country}
                          svg
                        />
                      </div>
                    </div>
                    <Button className={styles.saveButton} type="submit" variant="light"
                            disabled={!isValid || isSubmitting || !dirty}>
                      Save
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
                  </form>
                )}
              </Formik>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (state: State) => ({
  loading: state.auth.loading,
  user: state.auth.userId && state.entities.usersById[state.auth.userId],
})

const actionCreators = {
  updateCurrentUser,
}

export default connect(mapStateToProps, actionCreators)(ProfilePage)
