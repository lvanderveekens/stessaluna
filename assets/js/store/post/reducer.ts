import ActionTypes from "./actionTypes"
import { PostState } from "./state.interface"

const storedFiltersString = localStorage.getItem('stessaluna:filters');

const initialState = {
  loading: false,
  filters: storedFiltersString ? JSON.parse(storedFiltersString) : {},
  hasNextPage: false,
  data: [],
}

const postReducer = (state: PostState = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS_PENDING:
      return {
        ...state,
        loading: true,
        data: action.payload.append
          ? [...state.data]
          : []
      }
    case ActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        hasNextPage: action.payload.posts.length === action.payload.limit,
        data: action.payload.append
          ? [...state.data, ...action.payload.posts]
          : [...action.payload.posts],
      }
    case ActionTypes.FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
      }
    case ActionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.post],
      }
    case ActionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        data: state.data.filter((post) => post.id !== action.payload.id),
      }
    case ActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        data: state.data.map((post) =>
          post.id === action.payload.postId
            ? {...post, comments: [...post.comments, action.payload.comment]}
            : post
        ),
      }
    case ActionTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        data: state.data.map((post) =>
          post.id === action.payload.postId
            ? {...post, comments: post.comments.filter((comment) => comment.id !== action.payload.commentId)}
            : post
        ),
      }
    case ActionTypes.SUBMIT_ANSWER_SUCCESS: {
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
    case ActionTypes.APPLY_CHANNEL_FILTER: {
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
