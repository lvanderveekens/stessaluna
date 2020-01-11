import React, { useState, useEffect, Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Feed from '../feed/Feed';
import NewPostForm from '../post/NewPostForm';
import axios from '../axios/client';
import NavBar from '../nav/NavBar';

const HomePage = (props) => {
  const [posts, setPosts] = useState([]);

  // TODO: should this be a redux action? because it updates state 
  const fetchPosts = () => {
    axios.get('/api/posts/')
      .then(res => { setPosts(res.data) })
      .catch(console.log);
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container>
        <Row>
          <Col md={3}>
            <NewPostForm fetchPosts={fetchPosts} />
          </Col>
          <Col md={6}>
            <Feed posts={posts} fetchPosts={fetchPosts} />
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default HomePage;