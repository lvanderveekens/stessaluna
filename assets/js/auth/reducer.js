import ActionTypes from './actionTypes';

const authReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SIGNED_IN:
      console.log("IN AUTH REDUCER!");
      return state;
    default:
      return state;
  }
}

export default authReducer; 