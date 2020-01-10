import ActionTypes from "./actionTypes";

export const storeToken = (token, refreshToken) => {
  localStorage.setItem('luna-app:jwt-token', token);
  localStorage.setItem('luna-app:refresh-token', refreshToken);
  return {
    type: ActionTypes.STORE_TOKEN,
    payload: {
      token,
      refreshToken
    }
  }
};