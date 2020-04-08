import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import { connect } from 'react-redux';
import { register } from '../store/auth/actions';
import styles from './RegistrationPage.scss?module';

interface Props {
  register: (username: string, password: string) => void
}

const RegistrationPage = ({ register }) => {

  return (
    <Container>
      <Row>
        <Col className={styles.centered} sm={6} md={4} lg={4} xl={3}>
          <h4 className="mb-3">Register</h4>
          <RegistrationForm onSubmit={({ username, password }) => { register(username, password) }} />
        </Col>
      </Row>
    </Container>
  );
};

const actionCreators = {
  register,
};

export default connect(null, actionCreators)(RegistrationPage)