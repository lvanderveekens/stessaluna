import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Feed from '../feed/Feed';
import NewPostForm from '../post/new-post/NewPostForm';

const HomePage = () => {

  return (
    <Row>
      <Col md={4} className="mb-4">
        <NewPostForm />
      </Col>
      <Col md={8} className="mb-4">
        <Feed />
      </Col>
    </Row>
  );
};

export default HomePage;