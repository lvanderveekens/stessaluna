import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Feed from '../feed/Feed';
import { useState } from 'react';
import NavBar from '../nav/NavBar';
import NewPost from '../post/new-post/NewPost';

const HomePage = () => {

  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} className="mb-4">
            <NewPost />
          </Col>
          <Col md={6} lg={5} className="mb-4">
            <Feed />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;