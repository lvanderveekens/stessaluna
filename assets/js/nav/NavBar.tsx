import React, { FunctionComponent } from 'react';
import { Navbar, Container, Dropdown } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../user/actions';
import history from '../history/history';
import User from '../user/user.interface';
import CustomToggle from '../dropdown/CustomToggle';

interface Props {
  loggedIn: boolean
  user?: User
  logOut: () => void
}

const NavBar: FunctionComponent<Props> = ({ loggedIn, user, logOut }) => {

  const handleLogoutClick = () => {
    logOut();
    history.push('/login');
  };

  return (
    <Navbar className={styles.nav} bg="dark" variant="dark">
      <Container className={styles.container}>
        <Navbar.Brand className={styles.brand} href="/">StessaLuna</Navbar.Brand>
        {loggedIn
          ? (user && (
            <Dropdown >
              <Dropdown.Toggle as={CustomToggle} id="something">
                <div className={styles.accountWrapper}>
                  <div className={styles.avatar}>
                    <img src={user.avatar} />
                  </div>
                  <span className={styles.userText}>{user.username}</span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
          ) : (
            <Link to="/login">Login</Link>
          )}
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