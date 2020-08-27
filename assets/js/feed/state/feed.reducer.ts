import {
  CREATE_POST_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_PENDING,
  FETCH_POSTS_SUCCESS
} from "../../post/state/post.constants";
import {APPLY_CHANNEL_FILTER} from "./feed.constants";

export interface FeedState {
  loading: boolean,
  filters: Filters
  hasNextPage: boolean,
  postIds: number[]
}

export interface Filters {
  channel?: string[]
}

const storedFiltersString = localStorage.getItem('stessaluna:filters');

const initialState = {
  loading: false,
  hasNextPage: false,
  filters: storedFiltersString ? JSON.parse(storedFiltersString) : {},
  postIds: []
}

const feedReducer = (state: FeedState = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return {
        ...state,
        loading: true,
        postIds: action.payload.append
          ? [...state.postIds]
          : []
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        hasNextPage: action.payload.result.length === action.payload.limit,
        postIds: action.payload.append
          ? [...state.postIds, ...action.payload.result]
          : [...action.payload.result],
      }
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
      }
    case APPLY_CHANNEL_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          channel: action.payload.channels.length
            ? action.payload.channels
            : undefined
        }
      }
    }
    case CREATE_POST_SUCCESS:
      const createdPostId = action.payload.result
      const createdPost = action.payload.entities.posts[createdPostId]
      if (!state.filters.channel || state.filters.channel.includes(createdPost.channel)) {
        return {
          ...state,
          postIds: [...state.postIds, createdPostId]
        }
      }
      return state
    default:
      return state;
  }
}

export default feedReducer