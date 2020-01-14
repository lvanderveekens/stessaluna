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

const fetchPostsSuccess = (posts) => ({
  type: ActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts 
});