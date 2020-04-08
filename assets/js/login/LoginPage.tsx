import React, { Fragment, useState, FunctionComponent } from 'react';
import LoginForm from './LoginForm';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logIn } from '../store/auth/actions';
import NavBar from '../nav/NavBar';
import styles from './LoginPage.scss?module';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

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
    <>
      <Helmet>
        <style>{`body { background-color: ${styles.stessalunaBrandSecondary}; }`}</style>
      </Helmet>
      <Container>
        <Row>
          <Col className={styles.centered} sm={6} md={4} lg={4} xl={3}>
            <div className={styles.header}>
              <h5>Welcome to</h5>
              <h1>Stessaluna</h1>
            </div>
            <LoginForm onSubmit={handleSubmit} />
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <p className="text-white">Or <Link to="/register">click here</Link> to create a new account.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const actionCreators = {
  logIn,
};

export default connect(null, actionCreators)(LoginPage);