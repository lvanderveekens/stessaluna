import React, { Component } from 'react';
import { Navbar } from "react-bootstrap"

class NavBar extends Component {

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Luna app</Navbar.Brand>
      </Navbar>
    )
  }
}

export default NavBar;