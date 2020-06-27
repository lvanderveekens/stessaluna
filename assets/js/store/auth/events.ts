import {trackEvent} from "@redux-beacon/google-analytics";
import {LOG_IN_SUCCESS, LOG_OUT_SUCCESS, REGISTER_SUCCESS, UPDATE_PROFILE_SUCCESS} from "./actionTypes";

export const authEvents = {
  [LOG_IN_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'User',
    action: "Logged in"
  })),
  [LOG_OUT_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'User',
    action: "Logged out"
  })),
  [REGISTER_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'User',
    action: "Created an account"
  })),
  [UPDATE_PROFILE_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'User',
    action: "Updated profile"
  })),
};
