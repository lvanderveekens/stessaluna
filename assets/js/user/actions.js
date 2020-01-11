import ActionTypes from "./actionTypes";
import axios from '../axios/client';

export const logIn = (username, password, onSuccess) => {
  return dispatch => {
    axios.post('/api/token', { username, password })
      .then(res => {
        dispatch(storeToken(res.data));
        dispatch(authenticate());
        onSuccess();
      })
      .catch(console.log);
  };
};

export const storeToken = ({ token, refreshToken }) => ({
  type: ActionTypes.STORE_TOKEN,
  payload: { 
    token, 
    refreshToken,
  }
});

const authenticate = () => ({
  type: ActionTypes.AUTHENTICATE,
});