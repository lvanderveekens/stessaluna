import ActionTypes from "./actionTypes";
import axios from '../http/client';

export const logIn = (username, password, onSuccess) => {
  return dispatch => {
    axios.post('/api/token', { username, password })
      .then(res => {
        dispatch(storeToken(res.data));
        dispatch(logInSuccess());
        onSuccess();
      })
      .catch(console.log);
  };
};

export const logOut = () => {
  return dispatch => {
    axios.post('/api/logout')
      .then(res => {
        dispatch(logOutSuccess());
        dispatch(deleteToken(res.data));
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

export const deleteToken = () => ({
  type: ActionTypes.DELETE_TOKEN,
});

const logInSuccess = () => ({
  type: ActionTypes.LOGIN_SUCCESS,
});

const logOutSuccess = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});