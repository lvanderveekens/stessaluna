import React from 'react';
import { Navbar, Container } from "react-bootstrap"
import styles from './NavBar.scss?module'
import { Link } from 'react-router-dom';

const NavBar = (props) => {

 return (
    <Navbar className={styles.nav} bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Aap</Navbar.Brand>
        {/* https://symfony.com/doc/current/security.html#installation */}
        {/* https://symfonycasts.com/screencast/symfony-rest4/token-test#play */}
        {/* {this.state.authenticated === true && <Menu.Item id="logout-button" as="a" onClick={this.logout}>Logout</Menu.Item>} */}
        <Link to="/login">Login</Link>
      </Container>
    </Navbar>
  )
}

export default NavBar;