import React, { FunctionComponent, useState } from 'react';
import { Navbar, Container, Spinner, Nav, Dropdown } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../store/auth/actions';
import User from '../user/user.interface';
import { State } from '../store';
import Avatar from '../user/avatar/Avatar';
import CustomToggle from '../dropdown/CustomToggle';

interface Props {
  loggedIn: boolean
  user?: User
  loading: boolean
  logOut: () => void
}

const NavBar: FunctionComponent<Props> = ({ loggedIn, user, loading, logOut }) => {

  const [expanded, setExpanded] = useState(false);

  const renderMenu = () => {
    if (loading) {
      return <span style={{ padding: '0 0.5rem' }}> <Spinner animation="border" variant="warning" /> </span>
    }
    if (!loggedIn || !user) {
      return <Link className={styles.link} to="/login">Login</Link>;
    }
    return (
      <Dropdown className={styles.dropDown} alignRight={true}>
        <Dropdown.Toggle as={CustomToggle} id="something">
          <div className={styles.accountWrapperLarge}>
            <div style={{ marginRight: '0.7rem' }}>
              <Avatar src={user.avatar} size='xs' />
            </div>
            <span className={styles.userText}>{user.username}</span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/login" onClick={() => logOut()}>Logout</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <Navbar className={styles.nav}
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