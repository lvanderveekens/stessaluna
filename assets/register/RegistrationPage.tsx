import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../nav/NavBar';
import RegistrationForm from './RegistrationForm';

const RegistrationPage = ({ }) => {

  return (
    <Fragment>
      <NavBar />
      <Container>
        <Row>
          <Col />
          <Col md={6}>
            <h4 className="mb-3">Register</h4>
            <RegistrationForm onSubmit={() => { }} />
          </Col>
          <Col />
        </Row>
      </Container>
    </Fragment>
  );
}

export default RegistrationPage;