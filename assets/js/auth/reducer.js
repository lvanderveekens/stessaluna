import ActionTypes from '../user/actionTypes';

const loggedIn = localStorage.getItem('logged-in') == 'true';

const initialState = {
  loggedIn: loggedIn,
  user: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
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
    case ActionTypes.FETCH_CURRENT_USER_BEGIN:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    case ActionTypes.FETCH_CURRENT_USER_FAILED:
      return {
        ...state,
        loading: false
      };
    case ActionTypes.UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;