import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { addComment, deleteComment }  from '../../../store/post/actions';
import NewCommentForm from '../new-comment/NewCommentForm';
import styles from './CommentSection.scss?module';
import CommentInterface from '../comment.interface';
import Comment from '../Comment';
import moment from 'moment';
import User from '../../../user/user.interface';
import { State } from '../../../store';

interface Props {
  postId: number
  comments: CommentInterface[]
  addComment: (postId: number, text: string) => void
  deleteComment: (postId: number, commentId: number) => void
  user: User
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
              author={comment.user}
              user={user}
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

const mapStateToProps = (state: State) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, actionCreators)(CommentSection);