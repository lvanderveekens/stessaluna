import ActionTypes from './actionTypes';

const initialState = {
  loading: false,
  items: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS_BEGIN:
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
    case ActionTypes.FETCH_POSTS_FAILURE:
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
    default:
      return state;
  }
};

export default postReducer;