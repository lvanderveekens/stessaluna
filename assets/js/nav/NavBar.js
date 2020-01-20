import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut } from '../auth/actions';
import history from '../history/history';

const NavBar = ({ user, logOut }) => {

  const handleLogoutClick = () => {
    logOut();
    history.push('/login');
  };

  return (
    <Navbar className={`${styles.nav} mb-4`} bg="primary" variant="dark">
      <Container className={styles.container}>
        <Navbar.Brand href="/">Luna-app</Navbar.Brand>
        {user
          ? (
            <span className={styles.accountWrapper}>
              <span className={styles.userText}>Signed in as: <a href="#login">{user.firstName}</a></span>
              <span className={styles.logoutText} onClick={handleLogoutClick}>Logout</span>
              {/* TODO: placeholder avatar */}
              <img className={styles.avatar} src={user.avatarPath} />
            </span>
          ) : (
            <Link to="/login">Login</Link>
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