import ActionTypes from './actionTypes';

const initialState = {
  authenticated: localStorage.getItem('luna-app:authenticated') === 'true',
  token: localStorage.getItem('luna-app:jwt-token'),
  refreshToken: localStorage.getItem('luna-app:refresh-token')
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        authenticated: true,
      };
    default:
      return state;
  }
}

export default authReducer;