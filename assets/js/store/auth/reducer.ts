import {
  FETCH_CURRENT_USER_ERROR,
  FETCH_CURRENT_USER_PENDING,
  FETCH_CURRENT_USER_SUCCESS,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  UPDATE_PROFILE_SUCCESS
} from './actionTypes';
import {AuthState} from './state.interface';

const loggedIn = localStorage.getItem('stessaluna:logged-in') == 'true';

const initialState = {
  loggedIn: loggedIn,
  user: null,
  loading: false,
};

const authReducer = (state: AuthState = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        loggedIn: false,
      };
    case FETCH_CURRENT_USER_PENDING:
      return {
        ...state,
        loading: true
      };
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    case FETCH_CURRENT_USER_ERROR:
      return {
        ...state,
        loading: false
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;