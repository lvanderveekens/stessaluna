import { Formik } from "formik"
import React, { FC, useEffect, useState } from "react"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import ReactCountryFlag from "react-country-flag"
import { CountryDropdown } from "react-country-region-selector"
import { connect } from "react-redux"
import ImageInput from "../image/image-input/ImageInput"
import Navbar from "../nav/Navbar"
import { updateProfile } from "../store/auth/actions"
import { State } from "../store"
import User from "../user/user.interface"
import styles from "./ProfilePage.scss?module"
import Button from "../button/Button"

interface Props {
  loading: boolean
  user?: User
  updateProfile: (country: string, resetAvatar: boolean, avatar?: File, displayName?: string) => Promise<void>
}

const ProfilePage: FC<Props> = ({ loading, user, updateProfile }) => {
  const [resetAvatar, setResetAvatar] = useState(false)
  const [avatarImage, setAvatarImage] = useState<File>(null)
  const [feedbackMessage, setFeedbackMessage] = useState(null)

  useEffect(() => {
    if (user && !user.avatar.includes("avatar-default")) {
      fetch(user.avatar)
        .then((res) => res.blob())
        .then((blob) => {
          const filename = user.avatar.substring(user.avatar.lastIndexOf("/") + 1)
          setAvatarImage(new File([blob], filename, { type: "image/png" }))
        })
    }
  }, [user])

  const handleAvatarChange = (setFieldValue) => (image: File | null) => {
    if (image) {
      setAvatarImage(image)
      setFieldValue("avatar", image)
      setResetAvatar(false)
    } else {
      setAvatarImage(null)
      setFieldValue("avatar", null)
      if (!user.avatar.includes("avatar-default")) {
        setResetAvatar(true)
      }
    }
  }

  const handleSubmit = (values, { resetForm }) => {
    const { displayName, country, avatar } = values
    setFeedbackMessage(null)

    updateProfile(country, resetAvatar, avatar, displayName)
      .then(() => {
        setFeedbackMessage("Saved")
        resetForm()
      })
      .catch((error) => setFeedbackMessage(error))
  }

  return (
    <div className={styles.profilePage}>
      <Navbar page="Profile" />
      <Container className={styles.content}>
        <Row className="justify-content-center">
          <Col className={styles.centered} sm={8} md={6} lg={5} xl={5}>
            {loading && (
              <span style={{ padding: "0 0.5rem" }}>
                <Spinner animation="border" variant="warning" />
              </span>
            )}
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
                      value={avatarImage}
                      onChange={handleAvatarChange(setFieldValue)}
                      shape="circle"
                      overlayDisabled={avatarImage && avatarImage.name.includes("avatar-default")}
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
                  </form>
                )}
              </Formik>
            )}
            {/* TODO: update feedback message */}
            {feedbackMessage && <div>{feedbackMessage}</div>}
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
