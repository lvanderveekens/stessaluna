import React, { FunctionComponent, useReducer } from 'react';
import { connect } from 'react-redux';
import { addComment, deleteComment }  from '../../actions';
import NewCommentForm from '../new-comment/NewCommentForm';
import PropTypes from 'prop-types';
import styles from './CommentSection.scss?module';
import Comment from '../Comment';
import moment from 'moment';

interface Props {
  postId: number
  comments: any[]
  addComment: (postId: number, text: string) => void
  deleteComment: (postId: number, commentId: number) => void
  user: any
}

const CommentSection: FunctionComponent<Props> = ({ postId, comments, addComment, deleteComment, user }) => {

  const handleSubmitComment = (text: string) => {
    addComment(postId, text);
  };

  const handleDeleteComment = (commentId: number) => () => {
    deleteComment(postId, commentId);
  };

  return (
    <div className={styles.comments}>
      <NewCommentForm onSubmit={handleSubmitComment} avatar={user.avatar} />
      {comments && (
        comments
          .sort((comment, other) => new Date(other.createdAt).getTime() - new Date(comment.createdAt).getTime())
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

const actionCreators = {
  addComment,
  deleteComment,
};

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, actionCreators)(CommentSection);