import ActionTypes from "./actionTypes";

export const signedIn = (text) => {
  return {
    type: ActionTypes.SIGNED_IN,
    text
  }
};