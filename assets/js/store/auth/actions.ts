import ActionTypes from "./actionTypes";
import axios from '../../http/client';

export const logIn = (username, password) => {
  return dispatch => {
    return axios.post('/api/token', { username, password })
      .then(res => {
        dispatch(fetchUser());
        dispatch(success());
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };

  function success() { return { type: ActionTypes.LOGIN_SUCCESS }; };
};

export const logOut = () => {
  return dispatch => {
    axios.post('/api/logout')
      .then(res => {
        dispatch(success());
      })
      .catch(console.log);
  };

  function success() { return { type: ActionTypes.LOGOUT_SUCCESS }; };
};

export const register = (username, password) => {
  return dispatch => {
    return axios.post('/api/register', { username, password })
      .then(res => {
        dispatch(success());
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };

  function success() { return { type: ActionTypes.REGISTER_SUCCESS }; };
};

export const fetchUser = () => {
  return dispatch => {
    dispatch(pending());
    axios.get('/api/users/me')
      .then(res => {
        dispatch(success(res.data));
      })
      .catch((e) => {
        dispatch(error());
        console.log(e);
      });
  };

  function pending() { return { type: ActionTypes.FETCH_USER_PENDING }; };
  function success(user) { return { type: ActionTypes.FETCH_USER_SUCCESS, payload: { user } }; };
  function error() { return { type: ActionTypes.FETCH_USER_ERROR }; };
};

export const updateCurrentUser = (formData) => {
  // Workaround for old PHP bug where formdata is not parsed when using PUT/PATCH 
  formData.append('_method', 'PUT');

  return dispatch => {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/me', formData)
        .then(res => {
          dispatch(success(res.data));
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  function success(user) { return { type: ActionTypes.UPDATE_CURRENT_USER_SUCCESS, payload: { user } }; };
};