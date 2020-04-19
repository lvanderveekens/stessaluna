import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Feed from '../feed/Feed';
import { useState } from 'react';
import NavBar from '../nav/NavBar';
import NewPostForm from '../post/new-post/new-post-form';

const HomePage = () => {

  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <h4 className="mb-4">Home</h4>
            <div className="mb-4">
              <NewPostForm />
            </div>
            <div>
              <Feed />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;