import React, { FC, useState } from 'react';
import { Navbar, Container } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import UserDropdown from './user-dropdown/UserDropdown';

const NavBar: FC = () => {

  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar className={styles.nav}
      sticky="top"
      expand="lg"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container className={styles.container}>
        <Navbar.Brand className={styles.brand}><Link to="/">Stessaluna</Link></Navbar.Brand>
        <UserDropdown />
      </Container>
    </Navbar>
  );
};

export default NavBar;