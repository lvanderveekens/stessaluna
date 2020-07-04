import {Formik} from "formik"
import React, {FC, useEffect, useState} from "react"
import {Alert, Col, Container, Row, Spinner} from "react-bootstrap"
import ReactCountryFlag from "react-country-flag"
import {CountryDropdown} from "react-country-region-selector"
import {connect} from "react-redux"
import ImageInput from "../image/image-input/ImageInput"
import Navbar from "../nav/Navbar"
import {updateProfile} from "../store/auth/actions"
import {State} from "../store"
import User from "../user/user.interface"
import styles from "./ProfilePage.scss?module"
import Button from "../button/Button"
import {COLUMN_BREAKPOINTS} from "../config/column-breakpoints";
import Image from "../image/image.interface";

interface Props {
  loading: boolean
  user?: User
  updateProfile: (country: string, resetAvatar: boolean, avatar?: File, displayName?: string) => Promise<void>
}

interface FormValues {
  displayName?: string
  country: string
  avatar: Image
}

const ProfilePage: FC<Props> = ({ loading, user, updateProfile }) => {
  const [resetAvatar, setResetAvatar] = useState(false)
  const [avatarImage, setAvatarImage] = useState<File>(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [submitError, setSubmitError] = useState(false)

  useEffect(() => {
    if (user && !user.avatar.url.includes("avatar-default")) {
      // fetch(user.avatar.url)
      //   .then((res) => res.blob())
      //   .then((blob) => {
      //     const filename = user.avatar.url.substring(user.avatar.url.lastIndexOf("/") + 1)
      //     setAvatarImage(new File([blob], filename, { type: "image/png" }))
      //   })
      // TODO:
    }
  }, [user])

  const handleAvatarChange = (setFieldValue) => (image: Image) => {
    // if (image) {
    //   setAvatarImage(image)
    //   setFieldValue("avatar", image)
    //   setResetAvatar(false)
    // } else {
    //   setAvatarImage(null)
    //   setFieldValue("avatar", null)
    //   if (!user.avatar.includes("avatar-default")) {
    //     setResetAvatar(true)
    //   }
    // }
    // TODO:
  }

  const handleSubmit = (values, { resetForm }) => {
    const { displayName, country, avatar } = values
    setAlertMessage(null)
    setSubmitError(false)

    updateProfile(country, resetAvatar, avatar, displayName)
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
            {user && (
              // TODO: move into separate form component
              <Formik
                initialValues={{
                  displayName: user.displayName || "",
                  country: user.country || "",
                  avatar: null,
                }}
                enableReinitialize
                onSubmit={handleSubmit}
              >
                {({values, setFieldValue, handleSubmit, handleChange, isValid, isSubmitting}) => (
                  <form className="mb-3" onSubmit={handleSubmit}>
                    <ImageInput
                      className={styles.imageInput}
                      value={user.avatar}
                      onChange={handleAvatarChange(setFieldValue)}
                      shape="circle"
                      overlayDisabled={user.avatar.url.includes("avatar-default")}
                      label="Avatar"
                    />
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
                    <Button className={styles.saveButton} type="submit" variant="light" disabled={!isValid || isSubmitting}>
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
  user: state.auth.user,
})

const actionCreators = {
  updateProfile,
}

export default connect(mapStateToProps, actionCreators)(ProfilePage)
