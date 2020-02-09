import React, { FC, useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import User from '../user/user.interface';
import { connect } from 'react-redux';
import styles from './ProfilePage.scss?module';
import { updateCurrentUser } from '../user/actions';

interface Props {
  user?: User
  updateCurrentUser: (data: FormData) => void
}

const ProfilePage: FC<Props> = ({ user, updateCurrentUser }) => {

  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (user) {
      setAvatarUrl(user.avatar);
    };
  }, [user]);

  const handleAvatarChange = (event) => {
    const image = event.currentTarget.files[0];
    if (image) {
      setAvatarUrl(URL.createObjectURL(image));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    updateCurrentUser(data);
  }

  return (
    <Row>
      <Col />
      <Col md={6}>
        <h4 className="mb-3">Profile</h4>
        {user && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input name="username" type="text" className="form-control" value={user.username} readOnly />
            </div>
            <div className="form-group">
              <label>Avatar</label>
              <label className={styles.avatarContainer} htmlFor="avatar">
                <div className={styles.aspectRatioBox}>
                  {avatarUrl && !avatarUrl.includes("avatar-default") && (
                    <img src={avatarUrl} />
                  )}
                </div>
              </label>
              <input id="avatar" name="avatar" type="file" className="form-control d-none" onChange={handleAvatarChange}/>
            </div>
            <Button className="btn btn-dark" type="submit">Save</Button>
          </form>
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