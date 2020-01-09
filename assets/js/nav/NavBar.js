import React, { useState, useEffect } from 'react';
import { Navbar, Container } from "react-bootstrap"
import styles from './NavBar.scss?module'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

const NavBar = ({ authenticated, token }) => {

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    // TODO: move to redux user?
    let config = {}
    if (authenticated) {
      config.headers = { Authorization: "Bearer " + token }
    }

    axios.get('/api/users/me', config)
      .then(res => { setFirstName(res.data.firstName) })
      .catch(console.log);

  }, [authenticated])

  return (
    <Navbar className={styles.nav} bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Aap</Navbar.Brand>
        {authenticated && firstName != ""
          ? <Navbar.Text>Signed in as: <a href="#login">{firstName}</a></Navbar.Text>
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
  authenticated: state.auth.authenticated,
  token: state.auth.token,
})

export default connect(mapStateToProps)(NavBar);