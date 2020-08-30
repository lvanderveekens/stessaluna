import {trackEvent} from "@redux-beacon/google-analytics";
import {
  UNDO_VOTE_ON_COMMENT_SUCCESS,
  UNDO_VOTE_ON_POST_SUCCESS,
  UPDATE_VOTE_ON_COMMENT_SUCCESS,
  UPDATE_VOTE_ON_POST_SUCCESS,
  VOTE_ON_COMMENT_SUCCESS,
  VOTE_ON_POST_SUCCESS
} from "./vote.constants";

export const voteEvents = {
  [VOTE_ON_POST_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Add vote"
  })),
  [UPDATE_VOTE_ON_POST_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Update vote"
  })),
  [UNDO_VOTE_ON_POST_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: 'Remove vote',
  })),
  [VOTE_ON_COMMENT_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Comment',
    action: "Add vote"
  })),
  [UPDATE_VOTE_ON_COMMENT_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Comment',
    action: "Update vote"
  })),
  [UNDO_VOTE_ON_COMMENT_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Comment',
    action: 'Remove vote',
  })),
};
