import React, { FunctionComponent, useState } from 'react';
import { Navbar, Container, Spinner, Nav } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../store/auth/actions';
import User from '../user/user.interface';
import { useMediaQuery } from 'react-responsive'
import { State } from '../store';

interface Props {
  loggedIn: boolean
  user?: User
  loading: boolean
  logOut: () => void
}

const NavBar: FunctionComponent<Props> = ({ loggedIn, user, loading, logOut }) => {

  const isMobile = useMediaQuery({ maxWidth: 480 });
  const [expanded, setExpanded] = useState(false);

  const renderMenu = () => {
    if (loading) {
      return <span style={{ padding: '0 0.5rem' }}> <Spinner animation="border" variant="warning" size="sm" /> </span> 
    }
    if (!loggedIn || !user) {
      return <Link className={styles.link} to="/login">Login</Link>;
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
            <span className={styles.userText}>{user.username}</span>
          </div>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.mobileNav} onSelect={() => setExpanded(false)}>
            <Link className={styles.link} to="/profile" onClick={() => setExpanded(false)}>Profile</Link>
            <Link className={styles.link} to="/login" onClick={() => { setExpanded(false); logOut(); }}>Logout</Link>
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
    <Navbar className={styles.nav}
      bg="dark"
      variant="dark"
      sticky="top"
      expand="lg"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container className={styles.container}>
        <Navbar.Brand className={styles.brand}><Link to="/">Stessaluna</Link></Navbar.Brand>
        {renderMenu()}
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state: State) => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
  loading: state.auth.loading,
});

const actionCreators = {
  logOut
};

export default connect(mapStateToProps, actionCreators)(NavBar);