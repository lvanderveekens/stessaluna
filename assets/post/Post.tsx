import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { addComment } from './actions';
import CommentSection from './comment/comment-section/CommentSection';
import Linkify from 'linkifyjs/react';


const Post = ({ id, text, author, timestamp, image, onDelete, avatar, comments }) => {

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className="d-flex">
            <img className={styles.avatar} src={avatar} />
            <div className={styles.usernameTimestampWrapper}>
              <div>{author}</div>
              <span className={styles.timestamp}>{timestamp}</span>
            </div>
          </div>
          <div className={styles.deleteButton} onClick={onDelete}>
            <FontAwesomeIcon icon={faTimes} color="red" />
          </div>
        </div>
        <div className={styles.text}><Linkify>{text}</Linkify></div>
        {image && (
          <img className={styles.image} src={image} />
        )}
      </div>
      {/* TODO: separate component */}
      <div className={styles.activity}>
        {comments && comments.length > 0 && (
          <div className={styles.numberOfComments} onClick={toggleComments}>Comments: {comments.length}</div>
        )}
      </div>
      {/* TODO: separate component */}
      <div className={styles.actions}>
        <div className={styles.addComment} onClick={() => setShowComments(true)}>
          <span className={styles.commentIcon}><FontAwesomeIcon icon={faCommentAlt} /></span>
          Add comment
        </div>
      </div>
      {showComments && (<CommentSection postId={id} comments={comments} />)}
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  image: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  comments: PropTypes.array,
};

const actionCreators = {
  addComment,
};

export default connect(null, actionCreators)(Post);