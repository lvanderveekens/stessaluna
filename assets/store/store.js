import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "../auth/reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import postReducer from "../post/reducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
    post: postReducer,
  }), 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
); 

store.subscribe(() => {
  // TODO: use cookies instead of localstorage
  const token = store.getState().auth.token;
  if (token != null) {
    localStorage.setItem('luna-app:jwt-token', token);
  } else {
    localStorage.removeItem('luna-app:jwt-token');
  }

  const refreshToken = store.getState().auth.refreshToken;
  if (refreshToken != null) {
    localStorage.setItem('luna-app:refresh-token', refreshToken);
  } else {
    localStorage.removeItem('luna-app:refresh-token');
  }
});

export default store;