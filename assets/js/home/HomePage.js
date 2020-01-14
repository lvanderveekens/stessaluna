import React, { useState, useEffect, Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Feed from '../feed/Feed';
import NewPostForm from '../post/NewPostForm';
import axios from '../axios/client';
import NavBar from '../nav/NavBar';

const HomePage = () => {

  return (
    <Fragment>
      <NavBar />
      <Container>
        <Row>
          <Col md={3}>
            <NewPostForm />
          </Col>
          <Col md={6}>
            <Feed />
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HomePage;