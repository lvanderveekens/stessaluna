import React from 'react';
import { connect } from 'react-redux';
import { addComment }  from '../../actions';
import NewCommentForm from '../new-comment/NewCommentForm';
import PropTypes from 'prop-types';
import styles from './CommentSection.scss?module';
import Comment from '../Comment';
import moment from 'moment';

const CommentSection = ({ postId, comments, addComment }) => {

  const handleNewCommentSubmit = (text) => {
    addComment(postId, text);
  };

  return (
    <div className={styles.comments}>
      <NewCommentForm onSubmit={handleNewCommentSubmit} />
      {comments && (
        comments
          .sort((comment, other) => new Date(other.createdAt) - new Date(comment.createdAt))
          .map((comment) =>
            <Comment
              key={comment.id}
              timestamp={moment(comment.createdAt).fromNow()}
              author={`${comment.user.firstName} ${comment.user.lastName}`}
              avatar={comment.user.avatar}
              text={comment.text}
            />
          )
      )}
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  addComment: PropTypes.func.isRequired,
};

const actionCreators = {
  addComment,
};

export default connect(null, actionCreators)(CommentSection);