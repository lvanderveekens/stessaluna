import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Feed from '../feed/Feed';
import NewPostForm from '../post/new-post/NewPostForm';
import { useState } from 'react';

const HomePage = () => {

  const [top, setTop] = useState(0);

  const refCallback = element => {
    if (element) {
      setTop(element.offsetTop);
    }
  };

  return (
    <Row>
      <Col ref={refCallback} md={5} lg={3} className="mb-4">
        <div className="position-sticky" style={{ top: top }}>
          <NewPostForm />
        </div>
      </Col>
      <Col md={7} lg={5} className="mb-4">
        <Feed />
      </Col>
    </Row>
  );
};

export default HomePage;