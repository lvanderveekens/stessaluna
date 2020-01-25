import React from 'react';
import { connect } from 'react-redux';
import { addComment }  from '../../actions';
import NewCommentForm from '../new/NewCommentForm';
import PropTypes from 'prop-types';
import styles from './CommentSection.scss?module';

const CommentSection = ({ postId, comments, addComment }) => {

  return (
    <div className={styles.comments}>
      <NewCommentForm addComment={(text) => addComment(postId, text)} />
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