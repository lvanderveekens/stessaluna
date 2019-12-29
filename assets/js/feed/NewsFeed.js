import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './NewsFeed.css?module';

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
          <div className={styles.post} key={index}>
            <div className={styles.postHeader}>
              <div>{post.id}</div>
              <Button size='sm' onClick={() => this.handleDeletePostClick(post)}>x</Button>
            </div>
            <div>{post.text}</div>
          </div>
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