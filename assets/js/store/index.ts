import {applyMiddleware, combineReducers, createStore} from "redux"
import authReducer from "./auth/reducer"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import postReducer from "./post/reducer"
import {AuthState} from "./auth/state.interface"
import {PostState} from "./post/state.interface"
import {createMiddleware} from 'redux-beacon'
import GoogleAnalytics, {trackEvent, trackPageView} from '@redux-beacon/google-analytics'
import {FETCH_POSTS_SUCCESS} from './post/actionTypes';


export interface State {
  auth: AuthState
  post: PostState
}

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
})

const eventsMap = {
  FETCH_POSTS_SUCCESS: trackEvent((action, prevState, nextState) => ({
    category: 'Post',
    action: "Fetch",
    label: 'Label...',
  }))
};

const analyticsMiddleware = createMiddleware(eventsMap, GoogleAnalytics());

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
  applyMiddleware(analyticsMiddleware)
))

store.subscribe(() => {
  const loggedIn = store.getState().auth.loggedIn
  if (loggedIn != null) {
    localStorage.setItem("stessaluna:logged-in", loggedIn.toString())
  } else {
    localStorage.removeItem("stessaluna:logged-in")
  }

  const filters = store.getState().post.filters
  localStorage.setItem("stessaluna:filters", JSON.stringify(filters))
})

export default store;
