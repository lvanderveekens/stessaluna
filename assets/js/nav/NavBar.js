import React, { Component } from 'react';
import { Navbar, Container } from "react-bootstrap"
import styles from './NavBar.scss?module'

class NavBar extends Component {

  render() {
    return (
      <Navbar className={styles.nav} bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Aap</Navbar.Brand>
        </Container>
      </Navbar>
    )
  }
}

export default NavBar;