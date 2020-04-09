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

export const register = (username: string, password: string, country: string) => {
  return dispatch => {
    return axios.post('/api/register', { username, password, country })
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

export const updateProfile = (firstName: string, lastName: string, country: string, resetAvatar: boolean, avatar?: File) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios.post('/api/profile', toFormData(firstName, lastName, country, resetAvatar, avatar))
        .then(res => {
          dispatch(success(res.data));
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  function success(user) { return { type: ActionTypes.UPDATE_PROFILE_SUCCESS, payload: { user } }; };

  function toFormData(firstName: string, lastName: string, country: string, resetAvatar: boolean, avatar?: File): FormData {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('country', country);
    formData.append('resetAvatar', resetAvatar.toString());
    if (avatar) {
      formData.append('avatar', avatar);
    }
    return formData;
  }
};