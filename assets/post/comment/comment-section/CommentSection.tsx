import React from 'react';
import { connect } from 'react-redux';
import { addComment, deleteComment }  from '../../actions';
import NewCommentForm from '../new-comment/NewCommentForm';
import PropTypes from 'prop-types';
import styles from './CommentSection.scss?module';
import Comment from '../Comment';
import moment from 'moment';

const CommentSection = ({ postId, comments, addComment, deleteComment }) => {

  const handleNewCommentSubmit = (text: string) => {
    addComment(postId, text);
  };

  const handleDeleteComment = (commentId: number) => () => {
    deleteComment(postId, commentId);
  };

  return (
    <div className={styles.comments}>
      <NewCommentForm onSubmit={handleNewCommentSubmit} />
      {comments && (
        comments
          .sort((comment, other) => new Date(other.createdAt).getDate() - new Date(comment.createdAt).getDate())
          .map((comment) =>
            <Comment
              key={comment.id}
              timestamp={moment(comment.createdAt).fromNow()}
              author={`${comment.user.firstName} ${comment.user.lastName}`}
              avatar={comment.user.avatar}
              text={comment.text}
              onDelete={handleDeleteComment(comment.id)}
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
  deleteComment: PropTypes.func.isRequired,
};

const actionCreators = {
  addComment,
  deleteComment,
};

export default connect(null, actionCreators)(CommentSection);