import React, { FC } from "react"
import CustomToggle from "../../dropdown/CustomToggle"
import { logOut } from "../../store/auth/actions"
import { Dropdown } from "react-bootstrap"
import styles from "./UserDropdown.scss?module"
import User from "../../user/user.interface"
import Avatar from "../../user/avatar/Avatar"
import UserDropdownPlaceholder from "./placeholder/UserDropdownPlaceholder"
import { State } from "../../store/configureStore"
import { connect } from "react-redux"

interface Props {
  user?: User
  loading: boolean
  logOut: () => void
}

const UserDropdown: FC<Props> = ({ user, loading, logOut }) => {
  if (loading) {
    return <UserDropdownPlaceholder />
  }

  if (!user) {
    return null
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
        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item href="/login" onClick={() => logOut()}>
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const mapStateToProps = (state: State) => ({
  user: state.auth.user,
  loading: state.auth.loading,
})

const actionCreators = {
  logOut,
}

export default connect(mapStateToProps, actionCreators)(UserDropdown)
