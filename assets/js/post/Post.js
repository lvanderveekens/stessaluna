import React from 'react';
import PropTypes from 'prop-types';
import styles from './Post.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Post = ({ text, userName, timestamp, image, onDelete, avatar }) => {

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <div className="d-flex">
          {/* TODO: what is avatar doesn't exist */}
          <img className={styles.avatar} src={avatar} />
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

      {image && (
        <img className={styles.image} src={image} />
      )}
    </div>
  );
};

Post.propTypes = {
  text: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  image: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  avatar: PropTypes.string,
};

export default Post;