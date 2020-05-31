import { faBars, faEdit, faHome, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import classNames from "classnames/bind"
import React, { FC, useEffect, useRef, useState } from "react"
import { Nav as BootstrapNav, Navbar as BootstrapNavbar } from "react-bootstrap"
import { RotateSpinLoader } from "react-css-loaders"
import { connect } from "react-redux"
import MediaQuery from "react-responsive"
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
import logoPath from "../../images/logo.svg"
import CustomToggle from "../dropdown/custom-toggle/CustomToggle"
import { State } from "../store"
import { logOut } from "../store/auth/actions"
import User from "../user/user.interface"
import styles from "./Navbar.scss?module"
const cx = classNames.bind(styles)

interface Props {
  page: string
  loggedIn: boolean
  user?: User
  logOut: () => void
}

const Navbar: FC<Props> = ({ page, loggedIn, user, logOut }) => {
  const [expanded, setExpanded] = useState(false)
  const topBarRef = useRef(null)

  useEffect(() => {
    document.body.style.paddingTop = `${topBarRef.current.clientHeight}px`
  }, [])

  const collapsableNavRef = useRef(null)

  useEffect(() => {
    if (expanded) {
      disableBodyScroll(collapsableNavRef.current)
    } else {
      enableBodyScroll(collapsableNavRef.current)
    }
    return () => {
      enableBodyScroll(collapsableNavRef.current)
    }
  }, [expanded])


  return (
    <>
      <BootstrapNavbar
        className={styles.nav}
        fixed="top"
        expand="lg"
        expanded={expanded}
        onToggle={(expanded) => setExpanded(expanded)}
      >
        <div id="top-bar" className={styles.topBar} ref={topBarRef}>
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
            {loggedIn && !expanded && (
              <BootstrapNav.Link className={styles.newPostLink} as={Link} to="/create/post">
                <span className={styles.createPostIcon}>
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
        <BootstrapNavbar.Collapse id="collapsable-nav" ref={collapsableNavRef}>
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
    </>
  )
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
})

const actionCreators = {
  logOut,
}

export default withRouter(connect(mapStateToProps, actionCreators)(Navbar))
