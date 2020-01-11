import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "../user/reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({
    user: userReducer
  }), 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
); 

store.subscribe(() => {
  localStorage.setItem('luna-app:jwt-token', store.getState().user.token);
  localStorage.setItem('luna-app:refresh-token', store.getState().user.refreshToken);
});

export default store;