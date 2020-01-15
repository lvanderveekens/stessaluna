import ActionTypes from "./actionTypes";
import axios from '../axios/client';

export const fetchPosts = () => {
  return dispatch => {
    axios.get('/api/posts/')
      .then(res => {
        dispatch(fetchPostsSuccess(res.data));
      })
      .catch(console.log);
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

const fetchPostsSuccess = (posts) => ({
  type: ActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts 
});

const createPostSuccess = (post) => ({
  type: ActionTypes.CREATE_POST_SUCCESS,
  payload: post 
});

const deletePostSuccess = (id) => ({
  type: ActionTypes.DELETE_POST_SUCCESS,
  payload: id
});