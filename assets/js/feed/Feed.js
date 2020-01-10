import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Post from '../post/Post';

class Feed extends Component {

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
        <h4>Feed</h4>
        {(this.props.posts.length > 0)
          ? this.props.posts
            .sort((p1, p2) => p2.id - p1.id)
            .map((post, index) =>
              <Post
                key={index}
                userName={post.userName}
                text={post.text}
                imagePath={post.imagePath}
                createdAt={post.createdAt}
                onDelete={() => this.handleDeletePost(post.id)}
              />)
          : (
            <div>
              No posts found!
            </div>
          )}
      </Fragment>
    )
  }
}

Feed.propTypes = {
  posts: PropTypes.array,
  fetchPosts: PropTypes.func
};

export default Feed;