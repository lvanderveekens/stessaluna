import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Feed from '../feed/Feed';
import NewPostForm from '../post/NewPostForm';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const HomePage = (props) => {
  const { authenticated, token } = props;

  const [posts, setPosts] = useState([]);

  // TODO: should this be a redux action? because it updates state 
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
        <Feed posts={posts} fetchPosts={fetchPosts} />
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}

HomePage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  authenticated: state.auth.authenticated,
})

export default connect(mapStateToProps)(HomePage);