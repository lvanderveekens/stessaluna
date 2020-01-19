import ActionTypes from "./actionTypes";
import axios from '../http/client';

export const logIn = (username, password, onSuccess) => {
  return dispatch => {
    axios.post('/api/token', { username, password })
      .then(res => {
        dispatch(storeToken(res.data));

        // TODO: move
        axios.get('/api/users/me')
          .then(res => {
            dispatch(success(res.data));
            onSuccess();
          });
      })
      .catch(console.log);
  };

  function success(user) {
    return { type: ActionTypes.LOGIN_SUCCESS, payload: { user } };
  };
};

export const logOut = () => {
  return dispatch => {
    axios.post('/api/logout')
      .then(res => {
        dispatch(deleteToken());
        dispatch(success());
      })
      .catch(console.log);
  };

  function success() { return { type: ActionTypes.LOGOUT_SUCCESS }; };
};

export const storeToken = ({ token, refreshToken }) => ({
  type: ActionTypes.STORE_TOKEN,
  payload: { token, refreshToken, }
});

export const deleteToken = () => ({ type: ActionTypes.DELETE_TOKEN });