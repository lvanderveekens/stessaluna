import React, { useState, useEffect, Fragment } from 'react';
import { Navbar, Container } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../http/client';
import { logOut } from '../auth/actions';
import history from '../history/history';

const NavBar = ({ loggedIn, user, logOut }) => {

  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // TODO: move to redux state currentUser?
  //   if (loggedIn) {
  //     setLoading(true);
  //     axios.get('/api/users/me')
  //       .then(res => {
  //         console.log(res.data);
  //         setUser(res.data);
  //         setLoading(false);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         setLoading(false);
  //       });
  //   }
  // }, [loggedIn]);

  const handleLogoutClick = () => {
    logOut();
    history.push('/login');
  };

  user = {
    firstName: "aap",
  };

  return (
    <Navbar className={`${styles.nav} mb-4`} bg="primary" variant="dark">
      <Container className={styles.container}>
        <Navbar.Brand href="/">Luna-app</Navbar.Brand>

        {!loading && (
          loggedIn && user.firstName
            ? (
              <Fragment>
                <span className={styles.accountWrapper}>
                  <span className={styles.userText}>Signed in as: <a href="#login">{user.firstName}</a></span>
                  <span className={styles.logoutText} onClick={handleLogoutClick}>Logout</span>
                  {/* TODO: placeholder avatar */}
                  <img className={styles.avatar} src={user.avatarPath} />
                </span>

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
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user
});

const actionCreators = {
  logOut
};

export default connect(mapStateToProps, actionCreators)(NavBar);