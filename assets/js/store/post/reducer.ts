import ActionTypes from './actionTypes';
import { PostState } from './state.interface';
import { ExercisePost } from '../../post/exercise/exercise-post.interface';

const initialState = {
  loading: false,
  items: []
};

const postReducer = (state: PostState = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS_PENDING:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.posts
      };
    case ActionTypes.FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false
      };
    case ActionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload.post]
      };
    case ActionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.payload.id) 
      };
    case ActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        items: state.items.map((post) =>
          post.id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload.comment] }
            : post
        )
      };
    case ActionTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        items: state.items.map((post) =>
          post.id === action.payload.postId
            ? { ...post, comments: post.comments.filter(comment => comment.id !== action.payload.commentId) }
            : post
        )
      };
    case ActionTypes.SUBMIT_ANSWER_SUCCESS:
      const exercisePost = state.items
        .filter((p) => p.type === 'exercise')
        .map((p) => <ExercisePost>p)
        .find((ep) => ep.exercise.id === action.payload.exercise.id)

      return {
        ...state,
        items: state.items.map((post) =>
          post.id === exercisePost.id ? { ...post, exercise: action.payload.exercise } : post
        )
      }
    default:
      return state;
  }
};

export default postReducer;