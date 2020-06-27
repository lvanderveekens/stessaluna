import {applyMiddleware, combineReducers, createStore} from "redux"
import authReducer from "./auth/reducer"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import postReducer from "./post/reducer"
import {AuthState} from "./auth/state.interface"
import {PostState} from "./post/state.interface"
import {createMiddleware} from 'redux-beacon'
import GoogleAnalytics from '@redux-beacon/google-analytics'
import {postEvents} from "./post/events";
import {authEvents} from "./auth/events";


export interface State {
  auth: AuthState
  post: PostState
}

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
})

const analyticsMiddleware = createMiddleware({...postEvents, ...authEvents}, GoogleAnalytics());

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
