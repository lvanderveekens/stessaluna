import {trackEvent} from "@redux-beacon/google-analytics";
import {REGISTER_SUCCESS, UPDATE_CURRENT_USER_SUCCESS} from "./user.constants";

export const userEvents = {
  [REGISTER_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'User',
    action: "Created an account"
  })),
  [UPDATE_CURRENT_USER_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'User',
    action: "Updated profile"
  })),
};