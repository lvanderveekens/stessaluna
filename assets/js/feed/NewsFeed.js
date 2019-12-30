import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Post from '../post/Post';

class NewsFeed extends Component {

  constructor(props) {
    super(props);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }

  handleDeletePost(postId) {
    axios.delete('/api/posts/' + postId)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    this.props.fetchPosts()
  }

  render() {
    return (
      <Fragment>
        {this.props.posts.map((post, index) =>
          <Post
            key={index}
            userName={post.userName}
            text={post.text}
            onDelete={() => this.handleDeletePost(post.id)}
          />
        )}
      </Fragment>
    )
  }
}

NewsFeed.propTypes = {
  posts: PropTypes.array,
  fetchPosts: PropTypes.func
};

export default NewsFeed;