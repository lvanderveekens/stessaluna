import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      loggedIn
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);