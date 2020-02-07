import React, { FunctionComponent } from 'react';
import { Navbar, Container } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../user/actions';
import history from '../history/history';
import User from '../user/user.interface';

interface Props {
  user?: User
  logOut: () => void;
}

const NavBar: FunctionComponent<Props> = ({ user, logOut }) => {

  const handleLogoutClick = () => {
    logOut();
    history.push('/login');
  };

  return (
    <Navbar className={`${styles.nav} mb-4`} bg="dark" variant="dark">
      <Container className={styles.container}>
        <Navbar.Brand href="/">Luna-app</Navbar.Brand>
        {user
          ? (
            <span className={styles.accountWrapper}>
              <span className={styles.userText}>Signed in as: <a href="#login">{user.username}</a></span>
              <span className={styles.logoutText} onClick={handleLogoutClick}>Logout</span>
              <span className={styles.avatar}>
                <img src={user.avatar} />
              </span>
            </span>
          ) : (
            <Link to="/login">Login</Link>
          )}
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const actionCreators = {
  logOut
};

export default connect(mapStateToProps, actionCreators)(NavBar);