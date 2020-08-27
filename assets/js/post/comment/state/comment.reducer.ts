import {DELETE_COMMENT_SUCCESS} from "./comment.constants";
import merge from 'lodash/merge'
import {UNDO_VOTE_ON_COMMENT_SUCCESS, VOTE_ON_COMMENT_SUCCESS} from "../../vote/state/vote.constants";
import Comment from "../comment.interface";

export const commentsById = (state: { [id: string]: Comment } = {}, action) => {
  switch (action.type) {
    case VOTE_ON_COMMENT_SUCCESS: {
      const comment = state[action.payload.commentId]
      const voteId = action.payload.result
      return {
        ...state,
        [comment.id]: {
          ...comment,
          voteIds: [...comment.voteIds, voteId]
        }
      }
    }
    case UNDO_VOTE_ON_COMMENT_SUCCESS: {
      const comment = state[action.payload.commentId]
      const voteId = action.payload.voteId
      return {
        ...state,
        [comment.id]: {
          ...comment,
          voteIds: comment.voteIds.filter(id => id !== voteId)
        }
      }
    }
    case DELETE_COMMENT_SUCCESS:
      const {commentId} = action.payload
      const {[commentId]: omit, ...other} = state
      return {...other}
    default:
      if (action.payload && action.payload.entities && action.payload.entities.comments) {
        return merge({}, state, action.payload.entities.comments)
      }
      return state
  }
}