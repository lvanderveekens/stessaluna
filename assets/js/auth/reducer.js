import ActionTypes from './actionTypes';

const token = localStorage.getItem('luna-app:jwt-token');
const refreshToken = localStorage.getItem('luna-app:refresh-token');

const initialState = {
  token,
  refreshToken,
  loggedIn: token != null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      };
    case ActionTypes.DELETE_TOKEN:
      return {
        ...state,
        token: null,
        refreshToken: null
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;