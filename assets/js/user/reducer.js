import ActionTypes from './actionTypes';

const initialState = {
  authenticated: localStorage.getItem('luna-app:jwt-token') !== null,
  token: localStorage.getItem('luna-app:jwt-token'),
  refreshToken: localStorage.getItem('luna-app:refresh-token')
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    case ActionTypes.AUTHENTICATE:
      return {
        ...state,
        authenticated: true,
      };
    default:
      return state;
  }
};

export default userReducer;