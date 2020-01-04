import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import NewsFeed from '../feed/NewsFeed';
import NewPostForm from '../post/NewPostForm';
import axios from 'axios';

const Home = () => {

  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get('/api/posts')
      .then(res => { setPosts(res.data) })
      .catch(console.log);
  }

  useEffect(() => {
    fetchPosts()
  });

  return (
    <Container>
      <Row>
        <Col md={3}>
          <NewPostForm fetchPosts={fetchPosts} />
        </Col>
        <Col md={6}>
          <NewsFeed posts={posts} fetchPosts={fetchPosts} />
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}

export default Home;