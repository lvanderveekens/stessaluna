import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import NewsFeed from '../feed/NewsFeed';
import NewPostForm from '../post/NewPostForm';
import axios from 'axios';

const Home = () => {

  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    let token
    if (localStorage.getItem('luna-app:jwt-token') !== null) {
      token = localStorage.getItem('luna-app:jwt-token');
    }

    axios.get('/api/posts/', {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => { setPosts(res.data) })
      .catch(console.log);
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <Row>
      <Col md={3}>
        <NewPostForm fetchPosts={fetchPosts} />
      </Col>
      <Col md={6}>
        <NewsFeed posts={posts} fetchPosts={fetchPosts} />
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}

export default Home;