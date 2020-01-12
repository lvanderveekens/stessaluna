import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.scss?module';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class Post extends Component {

  render() {
    return (
      <div className={styles.post}>
        <div className={styles.postHeader}>
          <div>
            <span><b>{this.props.userName}</b></span>
            <div className={styles.postTimestamp}>{moment(this.props.createdAt).format("h:mm A")}</div>
          </div>
          <div className={styles.deleteButton} onClick={this.props.onDelete}>
            <FontAwesomeIcon icon={faTimes} color="red"/>
          </div>
        </div>
        <div className={styles.postText}>{this.props.text}</div>

        {this.props.imagePath && (
          <img src={this.props.imagePath} />
        )}

      </div>
    );
  }
}

Post.propTypes = {
  text: PropTypes.string,
  userName: PropTypes.string,
  createdAt: PropTypes.string,
  onDelete: PropTypes.func,
  imagePath: PropTypes.string,
};

export default Post;