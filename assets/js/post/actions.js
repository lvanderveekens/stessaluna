import ActionTypes from "./actionTypes";
import axios from '../http/client';

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsBegin());

    axios.get('/api/posts/')
      .then(res => {
        dispatch(fetchPostsSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchPostsFailure());
        console.log(error);
      });
  };
};

export const createPost = (text, image, onSuccess) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);

    axios.post('/api/posts/', formData)
      .then(res => {
        console.log(res.data);
        dispatch(createPostSuccess(res.data));
        onSuccess();
      })
      .catch(console.log);
  };
};

export const deletePost = (id) => {
  return dispatch => {
    axios.delete('/api/posts/' + id)
      .then(res => {
        console.log(res.data);
        dispatch(deletePostSuccess(id));
      })
      .catch(console.log);
  };
};

const fetchPostsBegin = () => ({
  type: ActionTypes.FETCH_POSTS_BEGIN,
});

const fetchPostsSuccess = (posts) => ({
  type: ActionTypes.FETCH_POSTS_SUCCESS,
  payload: { posts }
});

const fetchPostsFailure = () => ({
  type: ActionTypes.FETCH_POSTS_FAILURE,
});

const createPostSuccess = (post) => ({
  type: ActionTypes.CREATE_POST_SUCCESS,
  payload: { post }
});

const deletePostSuccess = (id) => ({
  type: ActionTypes.DELETE_POST_SUCCESS,
  payload: { id }
});