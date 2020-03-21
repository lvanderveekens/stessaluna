import ActionTypes from "./actionTypes";
import axios from '../http/client';
import { AorbSentence } from "./post.interface";
import { NewPostRequest } from "./new-post/new-post-request.interface";

export const fetchPosts = () => {
  return dispatch => {
    dispatch(begin());

    axios.get('/api/posts')
      .then(res => {
        dispatch(success(res.data));
      })
      .catch((error) => {
        dispatch(failure());
        console.log(error);
      });
  };

  function begin() { return { type: ActionTypes.FETCH_POSTS_BEGIN, }; };

  function success(posts) { return { type: ActionTypes.FETCH_POSTS_SUCCESS, payload: { posts } }; };

  function failure() { return { type: ActionTypes.FETCH_POSTS_FAILURE }; };
};

export const createPost = (post: NewPostRequest) => {
  return dispatch => {
    return axios.post('/api/posts', post)
      .then(res => {
        console.log(res.data);
        dispatch(success(res.data));
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  function success(post) { return { type: ActionTypes.CREATE_POST_SUCCESS, payload: { post } }; };
};

export const deletePost = (id) => {
  return dispatch => {
    axios.delete('/api/posts/' + id)
      .then(res => {
        console.log(res.data);
        dispatch(success(id));
      })
      .catch(console.log);
  };

  function success(id) { return { type: ActionTypes.DELETE_POST_SUCCESS, payload: { id } }; };
};

export const addComment = (postId, text) => {
  return dispatch => {
    axios.post(`/api/posts/${postId}/comments`, { text })
      .then(res => {
        console.log(res.data);
        dispatch(success(postId, res.data));
      })
      .catch(console.log);
  };

  function success(postId, comment) { return { type: ActionTypes.ADD_COMMENT_SUCCESS, payload: { postId, comment } }; };
};

export const deleteComment = (postId, commentId) => {
  return dispatch => {
    axios.delete(`/api/posts/${postId}/comments/${commentId}`)
      .then(res => {
        console.log(res.data);
        dispatch(success(postId, commentId));
      })
      .catch(console.log);
  };

  function success(postId, commentId) { return { type: ActionTypes.DELETE_COMMENT_SUCCESS, payload: { postId, commentId } }; };
};