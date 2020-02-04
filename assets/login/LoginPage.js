import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logIn } from '../auth/actions';
import NavBar from '../nav/NavBar';
import styles from './LoginPage.scss?module';
import { Link } from 'react-router-dom';

const LoginPage = ({ history, logIn }) => {

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (values) => {
    setErrorMessage("");
    logIn(values.username, values.password)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
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
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <p>Or create a new account <Link to="/register">here</Link>.</p>
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