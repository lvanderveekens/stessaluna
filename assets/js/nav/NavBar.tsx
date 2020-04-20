import React, { FunctionComponent, useState } from 'react';
import { Navbar, Container, Spinner, Nav, Dropdown } from "react-bootstrap";
import styles from './NavBar.scss?module';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../store/auth/actions';
import User from '../user/user.interface';
import { State } from '../store';
import UserDropdown from './user-dropdown/UserDropdown';
import UserDropdownPlaceholder from './user-dropdown/placeholder/UserDropdownPlaceholder';

interface Props {
  user?: User
  loading: boolean
  logOut: () => void
}

const NavBar: FunctionComponent<Props> = ({ user, loading, logOut }) => {

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
        {loading && (<UserDropdownPlaceholder />)}
        {user && (<UserDropdown user={user} logOut={logOut} />)}
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

const actionCreators = {
  logOut
};

export default connect(mapStateToProps, actionCreators)(NavBar);