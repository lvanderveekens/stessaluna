import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Feed from '../feed/Feed';
// import NewPost from '../post/new-post/NewPost';
import { useState } from 'react';
import NewPost from '../post/new/NewPost';

const HomePage = () => {

  const [top, setTop] = useState(0);

  const refCallback = element => {
    if (element) {
      setTop(element.offsetTop);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col ref={refCallback} md={6} lg={5} className="mb-4">
        <div className="position-sticky" style={{ top: top }}>
          <NewPost />
        </div>
      </Col>
      <Col md={6} lg={5} className="mb-4">
        <Feed />
      </Col>
    </Row>
  );
};

export default HomePage;