import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { addComment } from './actions';

const Post = ({ id, text, userName, timestamp, image, onDelete, avatar, comments, addComment }) => {

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleAddCommentSubmit = (e) => {
    e.preventDefault();
    addComment(id, newComment);
    setNewComment("");
  };

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className="d-flex">
            {/* TODO: what if avatar doesn't exist */}
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
      <div className={styles.activity}>
        {comments && comments.length > 0 && (
          <div className={styles.numberOfComments} onClick={() => setShowComments(true)}>Comments: {comments.length}</div>
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.addComment} onClick={() => setShowComments(true)}>
          <span className={styles.commentIcon}><FontAwesomeIcon icon={faCommentAlt} /></span>
          Add comment
        </div>
      </div>
      {showComments && (
        <div className={styles.comments}>
          <form onSubmit={handleAddCommentSubmit}>
            <div className={styles.new}>
              {/* input field must autosize  */}
              <div className={styles.inputWrapper}>
                <input type="text" name="comment" onChange={(e) => setNewComment(e.target.value)} value={newComment} />
              </div>
              <div>
                <input type="submit" value="Submit" />
              </div>
            </div>
          </form>
          {comments && (
            comments
              .sort((comment, other) => new Date(other.createdAt) - new Date(comment.createdAt))
              .map((comment) =>
                <div key={comment.id}>
                  {comment.createdAt} {comment.user.firstName}: {comment.text}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  image: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  comments: PropTypes.array,
  addComment: PropTypes.func.isRequired,
};

const actionCreators = {
  addComment,
};

export default connect(null, actionCreators)(Post);