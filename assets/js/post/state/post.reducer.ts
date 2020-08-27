import {DELETE_POST_SUCCESS} from "./post.constants"
import {ADD_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS} from "../comment/state/comment.constants";
import Post from "../post.interface";
import merge from 'lodash/merge'
import {UNDO_VOTE_ON_POST_SUCCESS, VOTE_ON_POST_SUCCESS} from "../vote/state/vote.constants";

export const postsById = (state: { [id: string]: Post } = {}, action) => {
  switch (action.type) {
    case DELETE_POST_SUCCESS:
      const {postId} = action.payload
      const {[postId]: omit, ...other} = state
      return {...other}
    case ADD_COMMENT_SUCCESS: {
      const post = state[action.payload.postId]
      const commentId = action.payload.result
      return {
        ...state,
        [post.id]: {
          ...post,
          commentIds: [...post.commentIds, commentId]
        }
      }
    }
    case DELETE_COMMENT_SUCCESS: {
      const post = state[action.payload.postId]
      const commentId = action.payload.commentId
      return {
        ...state,
        [post.id]: {
          ...post,
          commentIds: post.commentIds.filter(id => id !== commentId)
        }
      }
    }
    case VOTE_ON_POST_SUCCESS: {
      const post = state[action.payload.postId]
      const voteId = action.payload.result
      return {
        ...state,
        [post.id]: {
          ...post,
          voteIds: [...post.voteIds, voteId]
        }
      }
    }
    case UNDO_VOTE_ON_POST_SUCCESS: {
      const post = state[action.payload.postId]
      const voteId = action.payload.voteId
      return {
        ...state,
        [post.id]: {
          ...post,
          voteIds: post.voteIds.filter(id => id !== voteId)
        }
      }
    }
    default: {
      if (action.payload && action.payload.entities && action.payload.entities.posts) {
        return merge({}, state, action.payload.entities.posts)
      }
      return state
    }
  }
}