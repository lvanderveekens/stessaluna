import axios from "../../http/client"
import {objectToFormData} from "object-to-formdata"
import {
  FETCH_CURRENT_USER_ERROR,
  FETCH_CURRENT_USER_PENDING,
  FETCH_CURRENT_USER_SUCCESS,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_SUCCESS
} from "./actionTypes";

export const logIn = (username, password) => {
  return (dispatch) => {
    return axios
      .post("/api/token", { username, password })
      .then((res) => {
        dispatch(fetchCurrentUser())
        dispatch(success())
      })
      .catch((error) => {
        console.log(error)
        return Promise.reject(error)
      })
  }

  function success() {
    return { type: LOG_IN_SUCCESS }
  }
}

export const logOut = () => {
  return (dispatch) => {
    axios
      .post("/api/logout")
      .then((res) => {
        dispatch(success())
      })
      .catch(console.log)
  }

  function success() {
    return { type: LOG_OUT_SUCCESS }
  }
}

export const register = (email: string, username: string, password: string, country: string) => {
  return (dispatch) => {
    return axios
      .post("/api/register", { email, username, password, country })
      .then((res) => {
        dispatch(success())
      })
      .catch((error) => {
        console.log(error)
        return Promise.reject(error)
      })
  }

  function success() {
    return { type: REGISTER_SUCCESS }
  }
}

export const fetchCurrentUser = () => {
  return (dispatch) => {
    dispatch(pending())
    axios
      .get("/api/users/me")
      .then((res) => {
        dispatch(success(res.data))
      })
      .catch((e) => {
        dispatch(error())
        console.log(e)
      })
  }

  function pending() {
    return { type: FETCH_CURRENT_USER_PENDING }
  }
  function success(user) {
    return { type: FETCH_CURRENT_USER_SUCCESS, payload: { user } }
  }
  function error() {
    return { type: FETCH_CURRENT_USER_ERROR }
  }
}

export const updateProfile = (country: string, resetAvatar: boolean, avatar?: File, displayName?: string) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/profile", objectToFormData({ country, resetAvatar, avatar, displayName }))
        .then((res) => {
          dispatch(success(res.data))
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  function success(user) {
    return { type: UPDATE_PROFILE_SUCCESS, payload: { user } }
  }
}
