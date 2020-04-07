import React, { FC, useState, useEffect, createRef, useRef, Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import User from '../user/user.interface';
import { connect } from 'react-redux';
import styles from './ProfilePage.scss?module';
import { updateProfile } from '../store/auth/actions';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  user?: User
  updateProfile: (resetAvatar: boolean, avatar?: File) => Promise<void>
}

const ProfilePage: FC<Props> = ({ user, updateProfile }) => {

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
    setFeedbackMessage(null);

    updateProfile(resetAvatar, values.avatar)
      .then(() => {
        setFeedbackMessage("Saved");
        resetForm();
      })
      .catch(error => setFeedbackMessage(error))
  }

  return (
    <Row>
      <Col />
      <Col md={6}>
        <h4 className="mb-3">Profile</h4>
        {user && (
          // TODO: move into separate form component
          <Formik
            initialValues={{ username: '', avatar: null }}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({
              values,
              setFieldValue,
              handleSubmit,
            }) => (
                <form className="mb-3" onSubmit={handleSubmit}>
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
                            <label htmlFor="avatar">
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
                  <Button className="btn btn-dark" type="submit">Save</Button>
                </form>
              )}
          </Formik>
        )}
        {feedbackMessage && (
          <div>{feedbackMessage}</div>
        )}
      </Col>
      <Col />
    </Row>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const actionCreators = ({
  updateProfile,
});

export default connect(mapStateToProps, actionCreators)(ProfilePage);