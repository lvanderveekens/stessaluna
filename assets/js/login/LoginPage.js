import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authenticate } from '../auth/actions';
import axios from 'axios';
import NavBar from '../nav/NavBar';

const LoginPage = ({ history, authenticate }) => {

  const handleSubmit = (values, { resetForm }) => {
    const req = {
      username: values.username,
      password: values.password,
    }

    // TODO: move to logIn redux action?
    axios.post('/api/token', req)
      .then(res => {
        authenticate(res.data.token, res.data.refreshToken);
        resetForm();
        history.push("/");
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <Fragment>
      <NavBar />
      <Container>
        <Row>
          <Col />
          <Col md={6}>
            <h4>Login</h4>
            <LoginForm onSubmit={handleSubmit} />
          </Col>
          <Col />
        </Row>
      </Container>
    </Fragment>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  authenticate: (token, refreshToken) => dispatch(authenticate(token, refreshToken)),
})

export default connect(null, mapDispatchToProps)(LoginPage);