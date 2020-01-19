import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logIn } from '../auth/actions';
import NavBar from '../nav/NavBar';

const LoginPage = ({ history, logIn }) => {

  const handleSubmit = (values) => {
    logIn(values.username, values.password)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        // TODO: show error on screen?
        console.log("AAP2");
      });
  };

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
};

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired,
};

const actionCreators = {
  logIn,
};

export default connect(null, actionCreators)(LoginPage);