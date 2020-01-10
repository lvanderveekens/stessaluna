import ActionTypes from './actionTypes';

const initialState = {
  authenticated: localStorage.getItem('luna-app:jwt-token') !== null,
  token: localStorage.getItem('luna-app:jwt-token'),
  refreshToken: localStorage.getItem('luna-app:refresh-token')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE:
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