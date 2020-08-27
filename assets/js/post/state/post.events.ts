import {trackEvent} from "@redux-beacon/google-analytics";
import {CREATE_POST_SUCCESS, DELETE_POST_SUCCESS, UPDATE_POST_SUCCESS} from "./post.constants";

export const postEvents = {
  [CREATE_POST_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Created a post"
  })),
  [UPDATE_POST_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Updated a post"
  })),
  [DELETE_POST_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Deleted a post"
  })),
};
