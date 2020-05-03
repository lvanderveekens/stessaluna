import React, { FC } from "react"
import { Dropdown } from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import CustomToggle from "../../dropdown/CustomToggle"
import { logOut } from "../../store/auth/actions"
import { State } from "../../store/configureStore"
import Avatar from "../../user/avatar/Avatar"
import User from "../../user/user.interface"
import styles from "./UserDropdown.scss?module"
const Loader = require("react-loaders").Loader

interface Props {
  user?: User
  logOut: () => void
}

const UserDropdown: FC<Props> = ({ user, logOut }) => {
  if (!user) {
    return <Loader className={styles.loader} type="ball-clip-rotate-multiple" active />
  }

  return (
    <Dropdown className={styles.userDropdown} alignRight={true}>
      <Dropdown.Toggle as={CustomToggle} id="something">
        <div className={styles.toggle}>
          <div style={{ marginRight: "0.7rem" }}>
            <Avatar src={user.avatar} size="xs" />
          </div>
          <span className={styles.username}>{user.username}</span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">
          Profile
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/login" onClick={() => logOut()}>
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const mapStateToProps = (state: State) => ({
  user: state.auth.user,
})

const actionCreators = {
  logOut,
}

export default connect(mapStateToProps, actionCreators)(UserDropdown)
