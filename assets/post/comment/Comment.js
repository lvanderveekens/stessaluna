import React from 'react';
import PropTypes from 'prop-types';
import styles from './Comment.scss?module';

const Comment = ({ timestamp, author, avatar, text }) => {

  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <img src={avatar} />
      </div>
      <div>
        <span className={styles.author}>
          {author}
        </span>
        <span className={styles.text}>{text}</span>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  timestamp: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Comment;