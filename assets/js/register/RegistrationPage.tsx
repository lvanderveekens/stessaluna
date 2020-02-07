import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../nav/NavBar';
import RegistrationForm from './RegistrationForm';
import { connect } from 'react-redux';
import { register } from '../user/actions';

interface Props {
  register: (username: string, password: string) => void
}

const RegistrationPage = ({ register }) => {

  return (
    <Fragment>
      <NavBar />
      <Container>
        <Row>
          <Col />
          <Col md={6}>
            <h4 className="mb-3">Register</h4>
            <RegistrationForm onSubmit={({ username, password }) => { register(username, password) }} />
          </Col>
          <Col />
        </Row>
      </Container>
    </Fragment>
  );
};

const actionCreators = {
  register,
};

export default connect(null, actionCreators)(RegistrationPage)