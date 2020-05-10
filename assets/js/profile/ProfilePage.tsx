import { Formik } from "formik"
import React, { FC, useEffect, useState } from "react"
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import ReactCountryFlag from "react-country-flag"
import { CountryDropdown } from "react-country-region-selector"
import { connect } from "react-redux"
import ImageInput from "../image/image-input/ImageInput"
import Navbar from "../nav/Navbar"
import { updateProfile } from "../store/auth/actions"
import { State } from "../store/configureStore"
import User from "../user/user.interface"
import styles from "./ProfilePage.scss?module"

interface Props {
  loading: boolean
  user?: User
  updateProfile: (
    firstName: string,
    lastName: string,
    country: string,
    resetAvatar: boolean,
    avatar?: File
  ) => Promise<void>
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
    const { firstName, lastName, country, avatar } = values
    setFeedbackMessage(null)

    updateProfile(firstName, lastName, country, resetAvatar, avatar)
      .then(() => {
        setFeedbackMessage("Saved")
        resetForm()
      })
      .catch((error) => setFeedbackMessage(error))
  }

  return (
    <>
      <Navbar page="Profile" />
      <Container>
        <Row className="justify-content-center">
          <Col className={styles.centered} sm={8} md={6} lg={5} xl={5}>
            <h4 className="mb-3">Profile</h4>
            {loading && (
              <span style={{ padding: "0 0.5rem" }}>
                <Spinner animation="border" variant="warning" />
              </span>
            )}
            {user && (
              // TODO: move into separate form component
              <Formik
                initialValues={{
                  firstName: user.firstName || "",
                  lastName: user.lastName || "",
                  country: user.country || "",
                  avatar: null,
                }}
                enableReinitialize
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, handleSubmit, handleChange }) => (
                  <form className="mb-3" onSubmit={handleSubmit}>
                    <div className="d-flex">
                      <div className="mr-5">
                        <div className="form-group">
                          <label htmlFor="username">Username</label>
                          <input name="username" type="text" className="form-control" value={user.username} readOnly />
                        </div>
                        <div className="form-group">
                          <label htmlFor="firstName">First name</label>
                          <input
                            name="firstName"
                            type="text"
                            className="form-control"
                            value={values.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lastName">Last name</label>
                          <input
                            name="lastName"
                            type="text"
                            className="form-control"
                            value={values.lastName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="country">Country</label>
                          <div className="d-flex">
                            <CountryDropdown
                              classes="form-control mr-2"
                              name="country"
                              valueType="short"
                              showDefaultOption={false}
                              value={values.country}
                              onChange={(value) => {
                                console.log(value)
                                setFieldValue("country", value)
                              }}
                            />
                            <ReactCountryFlag
                              style={{ width: "2rem", height: "2rem" }}
                              countryCode={values.country}
                              svg
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="form-group">
                          <label>Avatar</label>
                          <ImageInput
                            value={avatarImage}
                            onChange={handleAvatarChange(setFieldValue)}
                            overlayDisabled={avatarImage && avatarImage.name.includes("avatar-default")}
                          />
                        </div>
                      </div>
                    </div>
                    <Button className="btn btn-dark" type="submit">
                      Save
                    </Button>
                  </form>
                )}
              </Formik>
            )}
            {feedbackMessage && <div>{feedbackMessage}</div>}
          </Col>
        </Row>
      </Container>
    </>
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
