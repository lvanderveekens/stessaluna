import React, { FC, useState, useEffect, createRef, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import User from '../user/user.interface';
import { connect } from 'react-redux';
import styles from './ProfilePage.scss?module';
import { updateCurrentUser } from '../user/actions';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

interface Props {
  user?: User
  updateCurrentUser: (formData: FormData) => Promise<void>
}

const ProfilePage: FC<Props> = ({ user, updateCurrentUser }) => {

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

    const formData = new FormData();

    if (resetAvatar) {
      console.log("RESETTING AVATAR");
      formData.append('resetAvatar', 'true');
    } else if (values.avatar) {
      console.log("SETTING NEW AVATAR");
      formData.append('avatar', values.avatar);
    }

    updateCurrentUser(formData)
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
          <Formik
            initialValues={{ username: '', avatar: null}}
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
                    <label className={styles.avatarContainer} htmlFor="avatar">
                      <div className={styles.aspectRatioBox}>
                        {avatarUrl
                          ? (<img src={avatarUrl} />)
                          : (<FontAwesomeIcon className={styles.uploadIcon} icon={faUpload} />)}
                      </div>
                    </label>
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      className="form-control d-none"
                      onChange={handleAvatarChange(setFieldValue)}
                    />
                    {avatarUrl && !avatarUrl.includes('avatar-default') && (
                      <Button className="btn btn-dark" onClick={handleAvatarDelete(setFieldValue)}>
                        Delete test
                      </Button>
                    )}
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
  updateCurrentUser,
});

export default connect(mapStateToProps, actionCreators)(ProfilePage);