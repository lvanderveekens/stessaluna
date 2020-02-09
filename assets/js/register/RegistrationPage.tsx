import React from 'react';
import {  Row, Col } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import { connect } from 'react-redux';
import { register } from '../user/actions';

interface Props {
  register: (username: string, password: string) => void
}

const RegistrationPage = ({ register }) => {

  return (
    <Row>
      <Col />
      <Col md={6}>
        <h4 className="mb-3">Register</h4>
        <RegistrationForm onSubmit={({ username, password }) => { register(username, password) }} />
      </Col>
      <Col />
    </Row>
  );
};

const actionCreators = {
  register,
};

export default connect(null, actionCreators)(RegistrationPage)