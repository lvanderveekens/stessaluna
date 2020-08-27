import {trackEvent} from "@redux-beacon/google-analytics";
import {ADD_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS} from "./comment.constants";

export const commentEvents = {
  [ADD_COMMENT_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Comment',
    action: "Added a comment"
  })),
  [DELETE_COMMENT_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Comment',
    action: "Deleted a comment"
  })),
};