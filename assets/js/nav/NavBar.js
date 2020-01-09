import React from 'react';
import { Navbar, Container } from "react-bootstrap"
import styles from './NavBar.scss?module'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NavBar = ({ authenticated, token }) => {

  // TODO: if authenticated, do an API call to request user info.
  // TODO: add user controller to symfony
  if (authenticated) {

  }

  return (
    <Navbar className={styles.nav} bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Aap</Navbar.Brand>
        {authenticated === true
          ? <Navbar.Text>Signed in as: <a href="#login">Mark Otto</a></Navbar.Text>
          : <Link to="/login">Login</Link>}
      </Container>
    </Navbar>
  )
}

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  authenticated: state.auth.authenticated,
})

export default connect(mapStateToProps)(NavBar);