import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { storeToken } from '../auth/actions';
import axios from 'axios';

const LoginPage = ({ history, storeToken }) => {

  const handleSubmit = (values, { resetForm }) => {
    const req = {
      username: values.username,
      password: values.password,
    }

    axios.post('/api/token', req)
      .then(res => {
        storeToken(res.data.token);
        history.push("/");
        resetForm();
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <Row>
      <Col />
      <Col md={6}>
        <h4>Login</h4>
        <LoginForm onSubmit={handleSubmit} />
      </Col>
      <Col />
    </Row>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  storeToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  storeToken: token => dispatch(storeToken(token)),
})

export default connect(null, mapDispatchToProps)(LoginPage);