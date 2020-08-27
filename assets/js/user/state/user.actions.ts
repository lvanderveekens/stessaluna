import axios from "../../http/client";
import {
  FETCH_CURRENT_USER_ERROR,
  FETCH_CURRENT_USER_PENDING,
  FETCH_CURRENT_USER_SUCCESS,
  REGISTER_SUCCESS,
  UPDATE_CURRENT_USER_SUCCESS,
} from "./user.constants";
import Image from "../../image/image.interface";
import {userSchema} from "./user.schema";
import {normalize} from "normalizr";

export const fetchCurrentUser = () => {
  const pending = () => ({type: FETCH_CURRENT_USER_PENDING});
  const success = (normalizedUser) => ({type: FETCH_CURRENT_USER_SUCCESS, payload: {...normalizedUser}});
  const error = () => ({type: FETCH_CURRENT_USER_ERROR});

  return (dispatch) => {
    dispatch(pending())
    return axios
      .get("/api/users/me")
      .then((res) => {
        const normalizedUser = normalize(res.data, userSchema)
        dispatch(success(normalizedUser))
      })
      .catch((e) => {
        dispatch(error())
        console.log(e)
      })
  }
}

export const updateCurrentUser = (country: string, avatar?: Image, displayName?: string) => {
  const success = (normalizedUser) => ({type: UPDATE_CURRENT_USER_SUCCESS, payload: {...normalizedUser}});

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .put("/api/users/me", {country, avatar, displayName})
        .then((res) => {
          const normalizedUser = normalize(res.data, userSchema)
          dispatch(success(normalizedUser))
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export const register = (email: string, username: string, password: string, country: string) => {
  const success = () => ({type: REGISTER_SUCCESS});

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
}

