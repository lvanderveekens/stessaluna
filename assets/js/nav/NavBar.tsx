import React, { FunctionComponent } from 'react';
import { Navbar, Container, Dropdown, Spinner, Nav, NavDropdown } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../user/actions';
import history from '../history/history';
import User from '../user/user.interface';
import { useMediaQuery } from 'react-responsive'

interface Props {
  loggedIn: boolean
  user?: User
  logOut: () => void
}

const NavBar: FunctionComponent<Props> = ({ loggedIn, user, logOut }) => {

  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isLoadingUser = loggedIn && !user;

  const renderMenu = () => {
    if (!loggedIn) {
      return <Link className={styles.link} to="/login">Login</Link>;
    }
    if (isLoadingUser) {
      return <span style={{ padding: '0 0.5rem' }}> <Spinner animation="border" variant="warning" size="sm" /> </span> 
    }

    return isMobile ? renderMobileMenu() : renderDesktopMenu();
  }

  const renderMobileMenu = () => {
    return (
      <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ border: 'unset', padding: 'unset' }}>
          <div className={styles.accountWrapperSmall}>
            <div className={styles.avatar}>
              <img src={user.avatar} />
            </div>
          </div>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/login" onClick={() => logOut()}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </>
    );
  };

  const renderDesktopMenu = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.accountWrapperLarge}>
          <div className={styles.avatar}>
            <img src={user.avatar} />
          </div>
          <span className={styles.userText}>{user.username}</span>
        </div>
        <Link className={styles.link} to="/profile">Profile</Link>
        <Link className={styles.link} to="/login" onClick={() => logOut()}>Logout</Link>
      </div>
    );
  }
  
  return (
    <Navbar className={styles.nav} bg="dark" variant="dark" sticky="top" expand="lg" collapseOnSelect={true}>
      <Container className={styles.container}>
        <Navbar.Brand className={styles.brand}><Link to="/">Stessaluna</Link></Navbar.Brand>
        {renderMenu()}
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
});

const actionCreators = {
  logOut
};

export default connect(mapStateToProps, actionCreators)(NavBar);