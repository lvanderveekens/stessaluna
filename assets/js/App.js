import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import { Provider } from 'react-redux';
import PrivateRoute from './route/PrivateRoute';
import NotFoundPage from './404/NotFoundPage';
import store from './redux/store';

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

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);