import ActionTypes from './actionTypes';
import { AuthState } from './state.interface';

const loggedIn = localStorage.getItem('stessaluna:logged-in') == 'true';

const initialState = {
  loggedIn: loggedIn,
  user: null,
  loading: false,
};

const authReducer = (state: AuthState = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        loggedIn: false,
      };
    case ActionTypes.FETCH_USER_PENDING:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    case ActionTypes.FETCH_USER_ERROR:
      return {
        ...state,
        loading: false
      };
    case ActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;