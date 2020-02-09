import React, { FC, useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import User from '../user/user.interface';
import { connect } from 'react-redux';
import styles from './ProfilePage.scss?module';

interface Props {
  user?: User
}


const ProfilePage: FC<Props> = ({ user }) => {

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

  return (
    <Row>
      <Col />
      <Col md={6}>
        <h4 className="mb-3">Profile</h4>
        {user && (
          <form>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" value={user.username} readOnly />
            </div>
            <div className="form-group">
              <label>Avatar</label>
              <label className={styles.avatarContainer} htmlFor="avatar">
                <div className={styles.aspectRatioBox}>
                  <img src={avatarUrl} />
                </div>
              </label>
              <input id="avatar" type="file" className="form-control d-none" onChange={handleAvatarChange}/>
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
})

export default connect(mapStateToProps)(ProfilePage);