import React, { FC } from 'react';
import NewPostForm from './NewPostForm';
import { connect } from 'react-redux';
import User from '../../../user/user.interface';
import { createPost } from '../../../store/post/actions';
import { State } from '../../../store';
import Exercise from '../../../exercise/exercise.interface';

interface Props {
  user: User
  createPost: () => any
}

const NewPostFormContainer: FC<Props> = ({ user, createPost }) => {

  const handleSubmit = (text?: string, image?: File, exercise?: Exercise) => {
    console.log("submitting...");
    console.log({ text, image, exercise });
  }

  return (
    <NewPostForm
      user={user}
      onSubmit={handleSubmit}
    />
  )
}

const mapStateToProps = (state: State) => ({
  user: state.auth.user
});

const actionCreators = {
  createPost,
};

export default connect(mapStateToProps, actionCreators)(NewPostFormContainer);