import React, { FC, useState, useEffect, createRef, useRef, Fragment } from 'react';
import { Row, Col, Button, Container, Spinner } from 'react-bootstrap';
import User from '../user/user.interface';
import { connect } from 'react-redux';
import styles from './ProfilePage.scss?module';
import { updateProfile } from '../store/auth/actions';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../nav/NavBar';
import { State } from '../store';
import { CountryDropdown } from 'react-country-region-selector';
import ReactCountryFlag from "react-country-flag"


interface Props {
  loading: boolean
  user?: User
  updateProfile: (firstName: string, lastName: string, country: string, resetAvatar: boolean, avatar?: File) => Promise<void>
}

const ProfilePage: FC<Props> = ({ loading, user, updateProfile }) => {

  const [resetAvatar, setResetAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    if (user && !user.avatar.includes("avatar-default")) {
      setAvatarUrl(user.avatar);
    }
  }, [user]);

  const handleAvatarChange = (setFieldValue) => (event) => {
    const image = event.currentTarget.files[0];
    if (image) {
      setFieldValue("avatar", image);
      setAvatarUrl(URL.createObjectURL(image))
      setResetAvatar(false);
    }
  };

  const handleAvatarDelete = (setFieldValue) => () => {
    setFieldValue("avatar", null);
    setAvatarUrl(null);

    if (!user.avatar.includes('avatar-default')) {
      setResetAvatar(true);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    const { firstName, lastName, country, avatar } = values;
    setFeedbackMessage(null);

    updateProfile(firstName, lastName, country, resetAvatar, avatar)
      .then(() => {
        setFeedbackMessage("Saved");
        resetForm();
      })
      .catch(error => setFeedbackMessage(error))
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-center">
          <Col className={styles.centered} sm={8} md={6} lg={5} xl={4}>
            <h4 className="mb-3">Profile</h4>
            {loading && (
              <span style={{ padding: '0 0.5rem' }}><Spinner animation="border" variant="warning" /></span>
            )}
            {user && (
              // TODO: move into separate form component
              <Formik
                initialValues={{
                  firstName: user.firstName || '',
                  lastName: user.lastName || '',
                  country: user.country || '',
                  avatar: null
                }}
                enableReinitialize
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  setFieldValue,
                  handleSubmit,
                  handleChange,
                }) => (
                    <form className="mb-3" onSubmit={handleSubmit}>
                      <div className="d-flex">
                        <div className="mr-5">
                          <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                              name="username"
                              type="text"
                              className="form-control"
                              value={user.username}
                              readOnly
                            />
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
                                onChange={(value) => { console.log(value); setFieldValue('country', value) }}
                              />
                              <ReactCountryFlag style={{ width: '2rem', height: '2rem' }} countryCode={values.country} svg />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="form-group">
                            <label>Avatar</label>
                            <div className={styles.avatarContainer}>
                              <div className={styles.aspectRatioBox}>
                                {avatarUrl
                                  ? (
                                    <Fragment>
                                      <img src={avatarUrl} />
                                      {!avatarUrl.includes('avatar-default') && (
                                        <div className={styles.overlay}>
                                          <FontAwesomeIcon className={styles.deleteIcon} icon={faTimes}
                                            onClick={handleAvatarDelete(setFieldValue)} />
                                        </div>
                                      )}
                                    </Fragment>
                                  ) : (
                                    <label className={styles.uploadIconWrapper} htmlFor="avatar">
                                      <FontAwesomeIcon className={styles.uploadIcon} icon={faUpload} />
                                    </label>
                                  )}
                              </div>
                            </div>
                            <input
                              id="avatar"
                              name="avatar"
                              type="file"
                              className="form-control d-none"
                              onChange={handleAvatarChange(setFieldValue)}
                            />
                          </div>
                        </div>
                      </div>
                      <Button className="btn btn-dark" type="submit">Save</Button>
                    </form>
                  )}
              </Formik>
            )}
            {feedbackMessage && (
              <div>{feedbackMessage}</div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  loading: state.auth.loading,
  user: state.auth.user,
});

const actionCreators = ({
  updateProfile,
});

export default connect(mapStateToProps, actionCreators)(ProfilePage);