import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import NavBar from "./nav/NavBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import authReducer from './auth/reducer';

const App = () => {

  return (
    <Router>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Container>
    </Router>
  )
}

const store = createStore(combineReducers({ auth: authReducer }));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);