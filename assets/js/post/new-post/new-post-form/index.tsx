import React, { FC } from "react";
import NewPostForm from "./NewPostForm";
import { connect } from "react-redux";
import User from "../../../user/user.interface";
import { createPost } from "../../../store/post/actions";
import { State } from "../../../store";
import Exercise from "../../../exercise/exercise.model";
import NewPostFormPlaceholder from "./placeholder/NewPostFormPlaceholder";

interface Props {
  loading: boolean;
  user: User;
  createPost: (text?: string, image?: File, exercise?: Exercise) => Promise<void>;
}

const NewPostFormContainer: FC<Props> = ({ loading, user, createPost }) => {
  const handleSubmit = (text?: string, image?: File, exercise?: Exercise) => {
    console.log("submitting...");
    console.log({ text, image, exercise });
    return createPost(text, image, exercise);
  };

  if (loading) {
    return <NewPostFormPlaceholder />;
  }
  if (!user) {
    return null;
  }
  return <NewPostForm user={user} onSubmit={handleSubmit} />;
};

const mapStateToProps = (state: State) => ({
  loading: state.auth.loading,
  user: state.auth.user,
});

const actionCreators = {
  createPost,
};

export default connect(mapStateToProps, actionCreators)(NewPostFormContainer);
