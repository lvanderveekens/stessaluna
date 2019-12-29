import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './NewPostForm.css?module'

class NewPostForm extends Component {

  constructor(props) {
    super(props);
    this.handleNewPostClick = this.handleNewPostClick.bind(this);
  }

  async handleNewPostClick() {
    const response = await axios.post('/api/posts/');
    console.log(response.data);
    this.props.fetchPosts()
  }

  render() {
    return (
      <div className={styles.newPostForm}>
        <Button onClick={this.handleNewPostClick}>New post</Button>
      </div>
    )
  }
}

NewPostForm.propTypes = {
  fetchPosts: PropTypes.func
};

export default NewPostForm