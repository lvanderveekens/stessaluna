import React from 'react';
import { Navbar, Container } from "react-bootstrap"
import styles from './NavBar.scss?module'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = (props) => {

  return (
    <Navbar className={styles.nav} bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Aap</Navbar.Brand>
        {props.authenticated === true && <p>Logged in!</p>}
        <Link to="/login">Login</Link>
      </Container>
    </Navbar>
  )
}

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

export default NavBar;