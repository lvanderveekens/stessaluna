import React, { Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Feed from '../feed/Feed';
import NewPostForm from '../post/new-post/NewPostForm';
import NavBar from '../nav/NavBar';

const HomePage = () => {

  return (
    <Fragment>
      <NavBar />
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <NewPostForm />
          </Col>
          <Col md={8} className="mb-4">
            <Feed />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HomePage;