import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PropTypes from 'prop-types';

class NewsFeed extends Component {

  constructor(props) {
    super(props);
    this.handleDeletePostClick = this.handleDeletePostClick.bind(this);
  }

  async handleDeletePostClick(post) {
    const response = await axios.delete('/api/posts/' + post.id);
    console.log(response.data);
    this.props.fetchPosts()
  }

  render() {
    return (
      <Fragment>
        {this.props.posts.map((post, index) =>
          <div key={index}>
            id: {post.id}, text: {post.text}
            <Button onClick={() => this.handleDeletePostClick(post)}>Delete</Button>
          </div>
        )}
      </Fragment>
    )
  }
}

NewsFeed.propTypes = {
  posts: PropTypes.any,
  fetchPosts: PropTypes.func
};

export default NewsFeed;