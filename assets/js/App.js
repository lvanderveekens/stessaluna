import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import authReducer from './auth/reducer';
import PrivateRoute from './route/PrivateRoute';
import NotFoundPage from './404/NotFoundPage';

const App = () => {

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />

        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}


const store = createStore(
  combineReducers({ auth: authReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);