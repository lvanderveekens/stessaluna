import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

const newPostStyle = {
  paddingTop: '10px',
  display: 'flex',
  justifyContent: 'center',
};

class NewPostForm extends Component {

  constructor(props) {
    super(props);
    this.handleNewPostClick = this.handleNewPostClick.bind(this);
  }

  async handleNewPostClick() {
    const response = await axios.post('/api/posts/');
    console.log(response.data);
    this.props.updatePosts()
  }

  render() {
    return (
      <div style={newPostStyle}>
        <Button onClick={this.handleNewPostClick}>New post</Button>
      </div>
    )
  }
}

NewPostForm.propTypes = {
  updatePosts: PropTypes.func
};

export default NewPostForm