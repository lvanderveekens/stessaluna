import axios from "../../http/client"
import {LOG_IN_SUCCESS, LOG_OUT_SUCCESS,} from "./auth.constants";
import {fetchCurrentUser} from "../../user/state/user.actions";

export const logIn = (username, password) => {
  const success = () => ({type: LOG_IN_SUCCESS});

  return (dispatch) => {
    return axios
      .post("/api/token", {username, password})
      .then((res) => {
        return Promise.all([
          dispatch(success()),
          dispatch(fetchCurrentUser()),
        ])
      })
      .catch((error) => {
        console.log(error)
        return Promise.reject(error)
      })
  }
}

export const logOut = () => {
  return (dispatch) => {
    return axios
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
