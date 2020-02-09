import React, { FC } from 'react';
import { Row, Col } from 'react-bootstrap';
import User from '../user/user.interface';
import { connect } from 'react-redux';

interface Props {
  user?: User
}


const ProfilePage: FC<Props> = ({ user }) => {
  return (
    <Row>
      <Col />
      <Col md={6}>
        <h4 className="mb-3">Profile</h4>
        {user && (
          <div>
            <p>Username: {user.username}</p>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>
              Avatar:
              <img className="w-100" src={user.avatar} />
            </p>
          </div>
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