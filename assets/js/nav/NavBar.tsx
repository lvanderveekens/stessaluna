import {faBars, faEdit, faHome, faTimes, faUser} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock"
import classNames from "classnames/bind"
import React, {FC, useEffect, useRef, useState} from "react"
import {Nav as BootstrapNav, Navbar as BootstrapNavbar} from "react-bootstrap"
import {connect} from "react-redux"
import MediaQuery from "react-responsive"
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import logoPath from "../../images/logo.svg"
import CustomToggle from "../dropdown/custom-toggle/CustomToggle"
import {State} from "../store"
import {logOut} from "../store/auth/actions"
import styles from "./Navbar.scss?module"

const cx = classNames.bind(styles)

interface Props {
  page: string
  loggedIn: boolean
  logOut: () => void
}

const Navbar: FC<Props> = ({page, loggedIn, logOut}) => {
  const [expanded, setExpanded] = useState(false)
  const topBarRef = useRef(null)

  useEffect(() => {
    document.body.style.paddingTop = `${topBarRef.current.clientHeight}px`
    return () => {
      document.body.style.paddingTop = null
    }
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

  const closeMenu = () => setExpanded(false)

  const handleLogOutClick = () => {
    closeMenu()
    logOut()
  }

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
                <img className={styles.logo} src={logoPath} alt="Logo"/>
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
                  <FontAwesomeIcon icon={faEdit}/>
                </span>
              </BootstrapNav.Link>
            )}
            <BootstrapNavbar.Toggle className={styles.toggle} as={CustomToggle} aria-controls="collapsable-nav">
              {expanded ? (
                <FontAwesomeIcon style={{fontSize: "1.5rem"}} icon={faTimes}/>
              ) : (
                <FontAwesomeIcon icon={faBars}/>
              )}
            </BootstrapNavbar.Toggle>
          </div>
        </div>
        <BootstrapNavbar.Collapse id="collapsable-nav" ref={collapsableNavRef}>
          <BootstrapNav
            className={cx("mr-auto", {expanded})}
            style={expanded ? {height: `${window.innerHeight - topBarRef.current.clientHeight}px`} : {}}
            onSelect={() => setExpanded(false)}
          >
            <BootstrapNav.Link as={Link} to="/" onClick={closeMenu}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faHome}/>
              </span>
              Home
            </BootstrapNav.Link>
            {loggedIn && (
              <BootstrapNav.Link className={styles.profileLink} as={Link} to="/profile" onClick={closeMenu}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faUser}/>
              </span>
                Profile
              </BootstrapNav.Link>
            )}
            <div className={styles.footer}>
              {loggedIn
                ? (
                  <div className={styles.logoutWrapper}>
                    <BootstrapNav.Link  as={Link} to="/" onClick={handleLogOutClick}>
                      Log out
                    </BootstrapNav.Link>
                  </div>)
                : (
                  <div className={styles.loginSignupWrapper}>
                    <BootstrapNav.Link as={Link} to="/login">
                      Log in
                    </BootstrapNav.Link>
                    <BootstrapNav.Link className={styles.signupLink} as={Link} to="/signup">
                      Sign up
                    </BootstrapNav.Link>
                  </div>)
              }
            </div>
          </BootstrapNav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </>
  )
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.auth.loggedIn,
})

const actionCreators = {
  logOut,
}

export default withRouter(connect(mapStateToProps, actionCreators)(Navbar))
