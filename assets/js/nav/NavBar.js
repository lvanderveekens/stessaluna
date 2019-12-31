import React, { Component } from 'react';
import { Navbar, Container } from "react-bootstrap"

class NavBar extends Component {

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Aap</Navbar.Brand>
        </Container>
      </Navbar>
    )
  }
}

export default NavBar;