import ActionTypes from "./actionTypes";

export const authenticate = (token, refreshToken) => {
  localStorage.setItem('luna-app:jwt-token', token);
  localStorage.setItem('luna-app:refresh-token', refreshToken);
  return {
    type: ActionTypes.AUTHENTICATE,
    payload: {
      token,
      refreshToken
    }
  }
};