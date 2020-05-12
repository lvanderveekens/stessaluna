import { faBars, faTimes, faHome, faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import React, { FC, useEffect, useRef, useState } from "react"
import { Nav as BootstrapNav, Navbar as BootstrapNavbar } from "react-bootstrap"
import { connect } from "react-redux"
import MediaQuery from "react-responsive"
import { Link } from "react-router-dom"
import logoPath from "../../images/logo.svg"
import CustomToggle from "../dropdown/CustomToggle"
import { logOut } from "../store/auth/actions"
import { State } from "../store/configureStore"
import User from "../user/user.interface"
import styles from "./Navbar.scss?module"
import { RotateSpinLoader } from "react-css-loaders"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

interface Props {
  page: string
  user?: User
  logOut: () => void
}

const Navbar: FC<Props> = ({ page, user, logOut }) => {
  const [expanded, setExpanded] = useState(false)
  const navRef = useRef(null)
  const topBarRef = useRef(null)

  useEffect(() => {
    if (expanded) {
      disableBodyScroll(navRef.current)
    } else {
      enableBodyScroll(navRef.current)
    }
  }, [expanded])

  return (
    <BootstrapNavbar
      className={styles.nav}
      ref={navRef}
      fixed="top"
      expand="lg"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      onClick={(e) => console.log()}
    >
      <div className={styles.topBar} ref={topBarRef}>
        <div className="d-flex align-items-center">
          <BootstrapNavbar.Brand className={styles.brand}>
            <Link to="/">
              <img className={styles.logo} src={logoPath} alt="Logo" />
              <MediaQuery query="(min-width: 992px)">
                <span>Stessaluna</span>
              </MediaQuery>
            </Link>
          </BootstrapNavbar.Brand>
          <span className={styles.page}>{page}</span>
        </div>
        <div className="d-flex align-items-center">
          {user && !expanded && (
            <BootstrapNav.Link className={styles.newPostLink} as={Link} to="/">
              <span>
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </BootstrapNav.Link>
          )}
          <BootstrapNavbar.Toggle className={styles.toggle} as={CustomToggle} aria-controls="collapsable-nav">
            {expanded ? (
              <FontAwesomeIcon style={{ fontSize: "1.5rem" }} icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </BootstrapNavbar.Toggle>
        </div>
      </div>
      <BootstrapNavbar.Collapse id="collapsable-nav">
        <BootstrapNav
          className={cx("mr-auto", { expanded })}
          style={expanded ? { height: `${window.innerHeight - topBarRef.current.clientHeight}px` } : {}}
        >
          <BootstrapNav.Link as={Link} to="/">
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faHome} />
            </span>
            Home
          </BootstrapNav.Link>
          <BootstrapNav.Link className={styles.profileLink} as={Link} to="/profile">
            <span className={styles.icon}>
              {!user && <RotateSpinLoader className={styles.loader} />}
              {user && <img className={styles.avatar} src={user.avatar} />}
            </span>
            Profile
          </BootstrapNav.Link>
          <BootstrapNav.Link className={styles.logOutLink} as={Link} to="/login" onClick={() => logOut()}>
            Log out
          </BootstrapNav.Link>
        </BootstrapNav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  )
}

const mapStateToProps = (state: State) => ({
  user: state.auth.user,
})

const actionCreators = {
  logOut,
}

export default connect(mapStateToProps, actionCreators)(Navbar)
