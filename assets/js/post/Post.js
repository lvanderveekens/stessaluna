import React from 'react';
import PropTypes from 'prop-types';
import styles from './Post.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Post = ({ text, userName, timestamp, imagePath, onDelete }) => {

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <div>
          <span><b>{userName}</b></span>
          <div className={styles.postTimestamp}>{timestamp}</div>
        </div>
        <div className={styles.deleteButton} onClick={onDelete}>
          <FontAwesomeIcon icon={faTimes} color="red" />
        </div>
      </div>
      <div className={styles.postText}>{text}</div>

      {imagePath && (
        <img className={styles.postImage} src={imagePath} />
      )}
    </div>
  );
};

Post.propTypes = {
  text: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  imagePath: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default Post;