import React, { useState, useEffect, Fragment } from 'react';
import { Navbar, Container } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../http/client';
import { logOut } from '../auth/actions';
import history from '../history/history';

const NavBar = ({ authenticated, logOut }) => {

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    // TODO: move to redux state currentUser?
    if (authenticated) {
      axios.get('/api/users/me')
        .then(res => { setFirstName(res.data.firstName); })
        .catch(console.log);
    }
  }, [authenticated]);

  const handleLogoutClick = () => {
    logOut();
    history.push('/login');
  };

  return (
    <Navbar className={styles.nav} bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Luna-app</Navbar.Brand>
        {authenticated && firstName != ""
          ? (
            <Fragment>
              <Navbar.Text>
                <span className="pr-3">Signed in as: <a href="#login">{firstName}</a></span>
                <span className={styles.logoutText} onClick={handleLogoutClick}>Logout</span>
              </Navbar.Text>
            </Fragment>
          ) : (
            <Link to="/login">Login</Link>
          )}
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const actionCreators = {
  logOut
};

export default connect(mapStateToProps, actionCreators)(NavBar);