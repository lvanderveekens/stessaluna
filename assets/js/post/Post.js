import React from 'react';
import PropTypes from 'prop-types';
import styles from './Post.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Post = ({ text, userName, timestamp, imagePath, onDelete, avatarPath }) => {

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <div className="d-flex">
          {/* TODO: what is avatar doesn't exist */}
          <img className={styles.avatar} src={avatarPath} />
          <div className={styles.usernameTimestampWrapper}>
            <div>{userName}</div>
            <span className={styles.timestamp}>{timestamp}</span>
          </div>
        </div>
        <div className={styles.deleteButton} onClick={onDelete}>
          <FontAwesomeIcon icon={faTimes} color="red" />
        </div>
      </div>
      <div className={styles.text}>{text}</div>

      {imagePath && (
        <img className={styles.image} src={imagePath} />
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
  avatarPath: PropTypes.string,
};

export default Post;