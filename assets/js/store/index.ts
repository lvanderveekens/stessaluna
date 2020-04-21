import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./auth/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import postReducer from "./post/reducer";
import { AuthState } from "./auth/state.interface";
import { PostState } from "./post/state.interface";

export interface State {
  auth: AuthState;
  post: PostState;
}

const store = createStore(
  combineReducers({
    auth: authReducer,
    post: postReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  const loggedIn = store.getState().auth.loggedIn;
  if (loggedIn != null) {
    localStorage.setItem("logged-in", loggedIn.toString());
  } else {
    localStorage.removeItem("logged-in");
  }
});

export default store;
