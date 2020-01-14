import ActionTypes from './actionTypes';

const initialState = [];

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default postReducer;