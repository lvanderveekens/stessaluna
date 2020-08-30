import {trackEvent} from "@redux-beacon/google-analytics";
import {APPLY_CHANNEL_FILTER} from "./feed.constants";

export const feedEvents = {
  [APPLY_CHANNEL_FILTER]: trackEvent((action, prevState, nextState) => ({
    category: 'Feed',
    action: "Apply channel filter",
    label: action.payload.channels.length ? JSON.stringify(action.payload.channels) : null
  })),
};