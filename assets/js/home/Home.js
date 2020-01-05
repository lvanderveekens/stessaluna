import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import NewsFeed from '../feed/NewsFeed';
import NewPostForm from '../post/NewPostForm';
import axios from 'axios';
import PropTypes from 'prop-types';

const Home = (props) => {
  const { authenticated, token } = props;

  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    let config = {}

    if (authenticated) {
      config.headers = { Authorization: "Bearer " + token }
    }

    axios.get('/api/posts/', config)
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

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  token: PropTypes.string,
};

export default Home;