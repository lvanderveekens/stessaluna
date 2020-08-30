import {applyMiddleware, combineReducers, createStore} from "redux"
import {authReducer, AuthState} from "./auth/state/auth.reducer"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import {createMiddleware} from 'redux-beacon'
import GoogleAnalytics from '@redux-beacon/google-analytics'
import {postEvents} from "./post/state/post.events";
import {authEvents} from "./auth/state/auth.events";
import Post from "./post/post.interface";
import Exercise from "./exercise/exercise.interface";
import Vote from "./post/vote/vote.interface";
import Comment from "./post/comment/comment.interface";
import feedReducer, {FeedState} from "./feed/state/feed.reducer";
import {exercisesById} from "./exercise/state/exercise.reducer";
import {commentsById} from "./post/comment/state/comment.reducer";
import {votesById} from "./post/vote/state/vote.reducer";
import {postsById} from "./post/state/post.reducer";
import User from "./user/user.interface";
import {userEvents} from "./user/state/user.events";
import {commentEvents} from "./post/comment/state/comment.events";
import {exerciseEvents} from "./exercise/state/exercise.events";
import {feedEvents} from "./feed/state/feed.events"
import {usersById} from "./user/state/user.reducer";
import {voteEvents} from "./post/vote/state/vote.events";

export interface State {
  auth: AuthState
  feed: FeedState
  entities: {
    postsById: { [id: string]: Post }
    commentsById: { [id: string]: Comment }
    exercisesById: { [id: string]: Exercise }
    votesById: { [id: string]: Vote }
    usersById: { [id: string]: User }
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  feed: feedReducer,
  entities: combineReducers({
    postsById: postsById,
    commentsById: commentsById,
    exercisesById: exercisesById,
    votesById: votesById,
    usersById: usersById,
  })
})

const analyticsMiddleware = createMiddleware({
  ...feedEvents,
  ...postEvents,
  ...commentEvents,
  ...exerciseEvents,
  ...authEvents,
  ...userEvents,
  ...voteEvents,
}, GoogleAnalytics());

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

  const filters = store.getState().feed.filters
  localStorage.setItem("stessaluna:filters", JSON.stringify(filters))
})

export default store;
