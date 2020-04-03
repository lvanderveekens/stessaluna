import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Feed from '../feed/Feed';
import { useState } from 'react';
import NewPost from '../post/new/NewPost';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

const HomePage = () => {

  const [top, setTop] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const newPostWrapperStyle = isMobile ? {} : { top: top };
  const newPostWrapperClass = classNames({ 'position-sticky': !isMobile });

  const refCallback = element => {
    if (element) {
      setTop(element.offsetTop);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col ref={refCallback} md={6} lg={5} className="mb-4">
        <div className={newPostWrapperClass} style={newPostWrapperStyle}>
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