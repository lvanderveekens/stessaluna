import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.scss?module';
import { Button } from 'react-bootstrap';

class Post extends Component {

  render() {
    return (
      <div className={styles.post}>
        <div className={styles.postHeader}>
          <div><b>{this.props.userName}</b></div>
          <Button size='sm' onClick={this.props.onDelete}>x</Button>
        </div>
        <div>{this.props.text}</div>
      </div>
    )
  }
}

Post.propTypes = {
  text: PropTypes.string,
  userName: PropTypes.string,
  onDelete: PropTypes.func
};

export default Post;