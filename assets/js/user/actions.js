import ActionTypes from "./actionTypes";
import axios from '../axios/client';

export const logIn = (username, password, onSuccess) => {
  return dispatch => {
    axios.post('/api/token', { username, password })
      .then(res => {
        localStorage.setItem('luna-app:jwt-token', res.data.token);
        localStorage.setItem('luna-app:refresh-token', res.data.refreshToken);
        localStorage.setItem('luna-app:authenticated', true);
        dispatch(loginSuccess(res.data));
        onSuccess();
      })
      .catch(error => {
        console.log(error);
        dispatch(loginFailure(error));
      });
  }
};

const loginSuccess = ({ token, refreshToken }) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: {
    token: token,
    refreshToken: refreshToken,
  }
});

const loginFailure = (error) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload: { 
    error 
  }
});

