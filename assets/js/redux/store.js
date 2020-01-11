import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "../user/reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ user: userReducer }), 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
); 

export default store;