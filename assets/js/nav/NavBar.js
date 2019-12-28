import React, { Component } from 'react';
import { Navbar } from "react-bootstrap"

class NavBar extends Component {

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
      </Navbar>
    )
  }
}

export default NavBar;