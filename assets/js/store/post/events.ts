import {trackEvent} from "@redux-beacon/google-analytics";
import {
  ADD_COMMENT_SUCCESS,
  APPLY_CHANNEL_FILTER,
  CREATE_POST_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS, SUBMIT_ANSWER_SUCCESS, UPDATE_POST_SUCCESS
} from "./actionTypes";

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
  [ADD_COMMENT_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Added a comment"
  })),
  [DELETE_COMMENT_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Deleted a comment"
  })),
  [SUBMIT_ANSWER_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Submitted an answer"
  })),
  [APPLY_CHANNEL_FILTER]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Applied a filter"
  })),
};
