import React, { Fragment, useState, FunctionComponent } from 'react';
import LoginForm from './LoginForm';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logIn } from '../user/actions';
import NavBar from '../nav/NavBar';
import styles from './LoginPage.scss?module';
import { Link } from 'react-router-dom';

interface Props {
  history: any
  logIn: (username: string, password: string) => Promise<void>
}

const LoginPage: FunctionComponent<Props> = ({ history, logIn }) => {

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = ({ username, password }) => {
    setErrorMessage("");
    logIn(username, password)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <Row>
      <Col />
      <Col md={6}>
        <h4 className="mb-3">Login</h4>
        <LoginForm onSubmit={handleSubmit} />
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <p>Or <Link to="/register">click here</Link> to create a new account.</p>
      </Col>
      <Col />
    </Row>
  );
};

const actionCreators = {
  logIn,
};

export default connect(null, actionCreators)(LoginPage);