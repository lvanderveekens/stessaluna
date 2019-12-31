import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.scss?module';
import { Button } from 'react-bootstrap';
import moment from 'moment';

class Post extends Component {

  render() {
    return (
      <div className={styles.post}>
        <div className={styles.postHeader}>
          <div><b>{this.props.userName}</b></div>
          <div>{moment(this.props.createdAt).format("MMM Do YYYY, h:mm A")}</div>
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
  createdAt: PropTypes.string,
  onDelete: PropTypes.func
};

export default Post;