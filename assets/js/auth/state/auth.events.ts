import {trackEvent} from "@redux-beacon/google-analytics";
import {LOG_IN_SUCCESS, LOG_OUT_SUCCESS} from "./auth.constants";

export const authEvents = {
  [LOG_IN_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Authentication',
    action: "Logged in"
  })),
  [LOG_OUT_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Authentication',
    action: "Logged out"
  })),
};
