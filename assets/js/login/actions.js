import ActionTypes from "./actionTypes";
import axios from '../axios/client';

export const logIn = (username, password, onSuccess) => {
  return dispatch => {
    axios.post('/api/token', { username, password })
      .then(res => {
        localStorage.setItem('luna-app:jwt-token', res.data.token);
        localStorage.setItem('luna-app:refresh-token', res.data.refreshToken);
        localStorage.setItem('luna-app:authenticated', true);
        dispatch(logInSuccess(res.data));
        onSuccess();
      })
      .catch(error => {
        console.log(error);
        dispatch(logInFailure(error));
      });
  }
};

const logInSuccess = ({ token, refreshToken }) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: {
    token: token,
    refreshToken: refreshToken,
  }
});

const logInFailure = (error) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload: { 
    error 
  }
});

