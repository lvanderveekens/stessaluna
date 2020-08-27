import Vote from "../vote.interface";
import {UNDO_VOTE_ON_COMMENT_SUCCESS, UNDO_VOTE_ON_POST_SUCCESS} from "./vote.constants";
import merge from 'lodash/merge'

export const votesById = (state: { [id: string]: Vote } = {}, action) => {
  switch (action.type) {
    case UNDO_VOTE_ON_POST_SUCCESS:
    case UNDO_VOTE_ON_COMMENT_SUCCESS:
      const {voteId} = action.payload
      const {[voteId]: omit, ...otherVotes} = state
      return {...otherVotes}
    default:
      if (action.payload && action.payload.entities && action.payload.entities.votes) {
        return merge({}, state, action.payload.entities.votes)
      }
      return state
  }
}