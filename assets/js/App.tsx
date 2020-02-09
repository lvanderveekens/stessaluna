import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, FunctionComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import { connect } from 'react-redux';
import PrivateRoute from './route/PrivateRoute';
import NotFoundPage from './not-found/NotFoundPage';
import Helmet from 'react-helmet';
import history from './history/history';
import { fetchCurrentUser } from './user/actions';
import RegistrationPage from './register/RegistrationPage';
import NavBar from './nav/NavBar';
import { Container } from 'react-bootstrap';
import ProfilePage from './profile/ProfilePage';

interface Props {
  loggedIn: boolean
  fetchCurrentUser: () => void
}

const App: FunctionComponent<Props> = ({ loggedIn, fetchCurrentUser }) => {

  useEffect(() => {
    if (loggedIn) {
      fetchCurrentUser();
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>StessaLuna</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Router history={history}>
        <NavBar />
        <Container>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegistrationPage} />

            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </Router>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

const actionCreators = {
  fetchCurrentUser,
};

export default connect(mapStateToProps, actionCreators)(App);