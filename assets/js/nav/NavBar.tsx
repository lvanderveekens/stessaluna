import {faBars, faEdit, faHome, faInfo, faTimes, faUserCircle} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock"
import classNames from "classnames/bind"
import React, {FC, useEffect, useRef, useState} from "react"
import {Container, Nav as BootstrapNav, Navbar as BootstrapNavbar} from "react-bootstrap"
import {connect} from "react-redux"
import {useMediaQuery} from "react-responsive"
import {Link} from "react-router-dom"
import logoPath from "../../images/logo.svg"
import CustomToggle from "../dropdown/custom-toggle/CustomToggle"
import {State} from "../store"
import {logOut} from "../store/auth/actions"
import styles from "./Navbar.scss?module"
import {useWindowSize} from "../hooks/use-window-size";
import Button from "../button/Button";

const cx = classNames.bind(styles)

interface Props {
  pageTitle: string
  loggedIn: boolean
  logOut: () => void
}

const Navbar: FC<Props> = ({pageTitle, loggedIn, logOut}) => {
  const [expanded, setExpanded] = useState(false)
  const isBeforeBreakpoint = useMediaQuery({ query: '(max-width: 991px)' }) // based on 'md' from bootstrap
  const topBarRef = useRef(null)

  const isExpandedNavVisible = expanded && isBeforeBreakpoint

  const [_, windowHeight] = useWindowSize()

  useEffect(() => {
    document.body.style.paddingTop = `${topBarRef.current.clientHeight}px`
    return () => {
      document.body.style.paddingTop = null
    }
  }, [])

  const collapsableNavRef = useRef(null)

  useEffect(() => {
    if (isExpandedNavVisible) {
      disableBodyScroll(collapsableNavRef.current)
    } else {
      enableBodyScroll(collapsableNavRef.current)
    }
    return () => {
      enableBodyScroll(collapsableNavRef.current)
    }
  }, [isExpandedNavVisible])

  const closeMenu = () => setExpanded(false)

  const handleLogOutClick = () => {
    closeMenu()
    logOut()
  }

  return (
    <BootstrapNavbar
      className={styles.nav}
      fixed="top"
      expand="lg"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container>
        <div id="top-bar" className={styles.topBar} ref={topBarRef}>
          <div className="d-flex align-items-center">
            <BootstrapNavbar.Brand className={styles.brand}>
              <Link to="/">
                <img className={styles.logo} src={logoPath} alt="Logo"/>
                {!isBeforeBreakpoint && (<span>Stessaluna</span>)}
              </Link>
            </BootstrapNavbar.Brand>
            <span className={styles.pageTitle}>{pageTitle}</span>
          </div>
          <div className="d-flex align-items-center">
            {loggedIn && !isExpandedNavVisible && (
              <BootstrapNav.Link className={styles.createPostLink} as={Link} to="/create-post">
                {isBeforeBreakpoint
                  ? (<span className={styles.createPostIcon}>
                      <FontAwesomeIcon icon={faEdit}/>
                     </span>)
                  : (<Button className={styles.createPostButton} variant="light">Post</Button>)}
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
            className={cx("mr-auto", {isExpandedNavVisible})}
            style={isExpandedNavVisible ? {height: `${windowHeight - topBarRef.current.clientHeight}px`} : {}}
            onSelect={() => setExpanded(false)}
          >
            <BootstrapNav.Link as={Link} to="/" onClick={closeMenu}>
              {isExpandedNavVisible && (
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={faHome}/>
                </span>
              )}
              Home
            </BootstrapNav.Link>
            {loggedIn && (
              <BootstrapNav.Link className={styles.profileLink} as={Link} to="/profile" onClick={closeMenu}>
                {isExpandedNavVisible && (
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={faUserCircle}/>
                  </span>
                )}
                Profile
              </BootstrapNav.Link>
            )}
            <BootstrapNav.Link className={styles.aboutLink} as={Link} to="/about" onClick={closeMenu}>
              {isExpandedNavVisible && (
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={faInfo}/>
                </span>
              )}
              About
            </BootstrapNav.Link>
            <div className={styles.entryWrapper}>
              {loggedIn
                ? (
                  <div className={styles.logoutWrapper}>
                    <BootstrapNav.Link as={Link} to="/" onClick={handleLogOutClick}>
                      Log out
                    </BootstrapNav.Link>
                  </div>)
                : (
                  <div className={styles.loginSignupWrapper}>
                    <BootstrapNav.Link as={Link} to="/login">
                      Log in
                    </BootstrapNav.Link>
                    <BootstrapNav.Link className={styles.signupLink} as={Link} to="/signup">
                      <span>Sign up</span>
                    </BootstrapNav.Link>
                  </div>)
              }
            </div>
          </BootstrapNav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.auth.loggedIn,
})

const actionCreators = {
  logOut,
}

export default connect(mapStateToProps, actionCreators)(Navbar)
