import React from 'react';
import PropTypes from 'prop-types';
import styles from './Post.scss?module';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Post = ({ text, userName, createdAt, imagePath, onDelete }) => {

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <div>
          <span><b>{userName}</b></span>
          <div className={styles.postTimestamp}>{moment(createdAt).format("h:mm A")}</div>
        </div>
        <div className={styles.deleteButton} onClick={onDelete}>
          <FontAwesomeIcon icon={faTimes} color="red" />
        </div>
      </div>
      <div className={styles.postText}>{text}</div>

      {imagePath && (
        <img src={imagePath} />
      )}

    </div>
  );
};

Post.propTypes = {
  text: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  imagePath: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default Post;