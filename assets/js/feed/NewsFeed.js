import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PropTypes from 'prop-types';

const postStyle = {
  padding: '10px',
  margin: '10px 0 10px 0',
  border: '1px solid black'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

class NewsFeed extends Component {

  constructor(props) {
    super(props);
    this.handleDeletePostClick = this.handleDeletePostClick.bind(this);
  }

  async handleDeletePostClick(post) {
    const response = await axios.delete('/api/posts/' + post.id);
    console.log(response.data);
    this.props.updatePosts()
  }

  render() {
    return (
      <Fragment>
        {this.props.posts.map((post, index) =>
          <div key={index} style={postStyle}>
            <div style={headerStyle}>
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
  updatePosts: PropTypes.func
};

export default NewsFeed;