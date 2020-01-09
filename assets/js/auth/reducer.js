import ActionTypes from './actionTypes';

const initialState = {
  authenticated: localStorage.getItem('luna-app:jwt-token') !== null,
  token: localStorage.getItem('luna-app:jwt-token'),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_TOKEN:
      return {
        ...state,
        token: action.token,
        authenticated: true,
      };
    default:
      return state;
  }
}