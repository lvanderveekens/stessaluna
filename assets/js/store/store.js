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
  const loggedIn = store.getState().auth.loggedIn;
  if (loggedIn != null) {
    localStorage.setItem('logged-in', loggedIn);
  } else {
    localStorage.removeItem('logged-in');
  }
});

export default store;