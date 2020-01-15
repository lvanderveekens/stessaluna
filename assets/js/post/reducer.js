import ActionTypes from './actionTypes';

const initialState = [];

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS_SUCCESS:
      return action.payload;
    case ActionTypes.CREATE_POST_SUCCESS:
      return [
        ...state,
        action.payload
      ];
    case ActionTypes.DELETE_POST_SUCCESS:
      return state.filter(post => post.id !== action.payload);
    default:
      return state;
  }
};

export default postReducer;