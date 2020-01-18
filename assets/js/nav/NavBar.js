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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: move to redux state currentUser?
    if (authenticated) {
      setLoading(true);
      axios.get('/api/users/me')
        .then(res => {
          setFirstName(res.data.firstName);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [authenticated]);

  const handleLogoutClick = () => {
    logOut();
    history.push('/login');
  };

  return (
    <Navbar className={`${styles.nav} mb-4`} bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Luna-app</Navbar.Brand>

        {!loading && (
          authenticated && firstName != ""
            ? (
              <Fragment>
                <Navbar.Text>
                  <span className="pr-3">Signed in as: <a href="#login">{firstName}</a></span>
                  <span className={styles.logoutText} onClick={handleLogoutClick}>Logout</span>
                </Navbar.Text>
              </Fragment>
            ) : (
              <Link to="/login">Login</Link>
            )
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