import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { Row, Col } from 'react-bootstrap';

const Login = (props) => {

  return (
    <Row>
      <Col />
      <Col md={6}>
        <h4>Login</h4>
        <LoginForm history={props.history} />
      </Col>
      <Col />
    </Row>
  );
}

Login.propTypes = {
  history: PropTypes.object
};

export default Login;

