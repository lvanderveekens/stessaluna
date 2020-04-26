import { createStore, combineReducers, applyMiddleware } from "redux"
import authReducer from "./auth/reducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import postReducer from "./post/reducer"
import { AuthState } from "./auth/state.interface"
import { PostState } from "./post/state.interface"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist"

export interface State {
  auth: AuthState
  post: PostState
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
}

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
const persistor = persistStore(store)

export { store, persistor }
