import React, { FC } from 'react';
import CustomToggle from '../../dropdown/CustomToggle';
import { Dropdown } from 'react-bootstrap';
import styles from './UserDropdown.scss?module';
import User from '../../user/user.interface';
import Avatar from '../../user/avatar/Avatar';

interface Props {
  user: User
  logOut: () => void
}

const UserDropdown: FC<Props> = ({ user, logOut }) => {

  return (
    <Dropdown className={styles.userDropdown} alignRight={true}>
      <Dropdown.Toggle as={CustomToggle} id="something">
        <div className={styles.toggle}>
          <div style={{ marginRight: '0.7rem' }}>
            <Avatar src={user.avatar} size='xs' />
          </div>
          <span className={styles.username}>{user.username}</span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item href="/login" onClick={() => logOut()}>Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default UserDropdown;