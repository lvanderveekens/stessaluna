import ActionTypes from "./actionTypes";

export const storeToken = (token) => {
  localStorage.setItem('luna-app:jwt-token', token);
  return {
    type: ActionTypes.STORE_TOKEN,
    token
  }
};