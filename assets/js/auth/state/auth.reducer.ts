import {LOG_IN_SUCCESS, LOG_OUT_SUCCESS,} from './auth.constants';
import {
  FETCH_CURRENT_USER_ERROR,
  FETCH_CURRENT_USER_PENDING,
  FETCH_CURRENT_USER_SUCCESS
} from "../../user/state/user.constants";

export interface AuthState {
  loggedIn: boolean;
  userId?: number;
  loading: boolean;
}

const loggedIn = localStorage.getItem('stessaluna:logged-in') == 'true';

const initialState = {
  loggedIn: loggedIn,
  userId: null,
  loading: false,
};

export const authReducer = (state: AuthState = initialState, action) => {
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
        userId: action.payload.result,
        loading: false
      };
    case FETCH_CURRENT_USER_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

