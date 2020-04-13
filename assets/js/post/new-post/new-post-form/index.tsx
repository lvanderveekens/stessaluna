import React, { FC, useState } from 'react';
import NewPostForm from './NewPostForm';
import { connect } from 'react-redux';
import User from '../../../user/user.interface';
import { createPost } from '../../../store/post/actions';
import { State } from '../../../store';
import { Spinner } from 'react-bootstrap';
import Exercise from '../../../exercise/exercise.model';

interface Props {
  user: User
  createPost: (text?: string, image?: File, exercise?: Exercise) => Promise<void>
}

const NewPostFormContainer: FC<Props> = ({ user, createPost }) => {

  const handleSubmit = (text?: string, image?: File, exercise?: Exercise) => {
    console.log("submitting...");
    console.log({ text, image, exercise });
    return createPost(text, image, exercise)
  }

  if (!user) {
    return <Spinner animation="border" variant="warning" />
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