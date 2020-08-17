import {
  ADD_COMMENT_SUCCESS,
  APPLY_CHANNEL_FILTER,
  CREATE_POST_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_PENDING,
  FETCH_POSTS_SUCCESS,
  SUBMIT_ANSWER_SUCCESS,
  UPDATE_POST_SUCCESS
} from "./actionTypes"
import {PostState} from "./state.interface"

const storedFiltersString = localStorage.getItem('stessaluna:filters');

const initialState = {
  loading: false,
  filters: storedFiltersString ? JSON.parse(storedFiltersString) : {},
  hasNextPage: false,
  data: [],
}

const postReducer = (state: PostState = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return {
        ...state,
        loading: true,
        data: action.payload.append
          ? [...state.data]
          : []
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        hasNextPage: action.payload.posts.length === action.payload.limit,
        data: action.payload.append
          ? [...state.data, ...action.payload.posts]
          : [...action.payload.posts],
      }
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
      }
    case CREATE_POST_SUCCESS:
      const createdPost = action.payload.post
      if (!state.filters.channel || state.filters.channel.includes(createdPost.channel)) {
        return {...state, data: [...state.data, createdPost]}
      }
      return state
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        data: state.data.map((post) => post.id === action.payload.post.id ? action.payload.post : post),
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        data: state.data.filter((post) => post.id !== action.payload.id),
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        data: state.data.map((post) =>
          post.id === action.payload.postId
            ? {...post, comments: [...post.comments, action.payload.comment]}
            : post
        ),
      }
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        data: state.data.map((post) =>
          post.id === action.payload.postId
            ? {...post, comments: post.comments.filter((comment) => comment.id !== action.payload.commentId)}
            : post
        ),
      }
    case SUBMIT_ANSWER_SUCCESS: {
      const exercisePost = findPostByExerciseId(action.payload.exercise.id, state)
      return {
        ...state,
        data: state.data.map((post) =>
          post.id === exercisePost.id
            ? { ...post, exercise: { ...action.payload.exercise } }
            : post
        ),
      }
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
    default:
      return state
  }
}

const findPostByExerciseId = (exerciseId: number, state: PostState) => {
  return state.data.filter((p) => p.exercise).find((p) => p.exercise.id === exerciseId)
}

export default postReducer
