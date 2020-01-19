import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import { connect } from 'react-redux';
import PrivateRoute from './route/PrivateRoute';
import NotFoundPage from './not-found/NotFoundPage';
import Helmet from 'react-helmet';
import history from './history/history';

const App = ({ loggedIn }) => {

  useEffect(() => {
    console.log("APP");
    console.log(loggedIn);
    // if (loggedIn) {
      // TODO: fetch user here and store in redux
    // };
  });

  return (
    <Fragment>
      <Helmet>
        <title>Luna-app</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(App);