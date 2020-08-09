import {faBars, faHome, faInfo, faTimes} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock"
import classNames from "classnames/bind"
import React, {FC, useEffect, useRef, useState} from "react"
import {Container, Nav as BootstrapNav, Navbar as BootstrapNavbar} from "react-bootstrap"
import {useMediaQuery} from "react-responsive"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import logoPath from "../../images/logo.svg"
import CustomToggle from "../dropdown/custom-toggle/CustomToggle"
import {State} from "../store"
import {logOut} from "../store/auth/actions"
import styles from "./Navbar.scss?module"
import {useWindowSize} from "../hooks/use-window-size";
import Button from "../button/Button";
import User from "../user/user.interface";

const cx = classNames.bind(styles)

interface Props {
  pageTitle: string
  loggedIn: boolean
  user?: User
  logOut: () => Promise<void>
}

const Navbar: FC<Props> = ({pageTitle, loggedIn, user, logOut}) => {
  const navbarRef = useRef(null)

  // window.innerWidth does not work as expected on iOS
  const [_, windowHeight] = useWindowSize()
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' }) // based on 'md' from bootstrap

  const [expanded, setExpanded] = useState(false)
  const isMobileNavOpen = isMobile && expanded

  useEffect(() => {
    document.body.style.paddingTop = `${navbarRef.current.clientHeight}px`
    return () => {
      document.body.style.paddingTop = null
    }
  }, [])

  const collapsableNavRef = useRef(null)

  useEffect(() => {
    if (isMobileNavOpen) {
      disableBodyScroll(collapsableNavRef.current)
    } else {
      enableBodyScroll(collapsableNavRef.current)
    }
    return () => {
      enableBodyScroll(collapsableNavRef.current)
    }
  }, [isMobileNavOpen])

  const closeMenu = () => setExpanded(false)

  const handleLogOutClick = () => {
    logOut()
      .then(() => closeMenu())
  }

  const renderDesktop = () => {
    return (
      <BootstrapNavbar
        className={cx(styles.nav, {isMobile})}
        fixed="top"
      >
        <Container>
          <div className="d-flex align-items-center" ref={navbarRef}>
            <BootstrapNavbar.Brand className={styles.brand}>
              <Link to="/">
                <img className={styles.logo} src={logoPath} alt="Logo"/>
                <span className={styles.brandText}>Stessaluna</span>
              </Link>
            </BootstrapNavbar.Brand>
            {isMobile && (<span className={styles.pageTitle}>{pageTitle}</span>)}
          </div>
          <BootstrapNav className="mr-auto">
            <BootstrapNav.Link className={cx({[styles.currentPageLink]: pageTitle == 'Home'})} as={Link} to="/"
                               onClick={closeMenu}>
              Home
            </BootstrapNav.Link>
            <BootstrapNav.Link className={cx({[styles.currentPageLink]: pageTitle == 'About'})} as={Link} to="/about"
                               onClick={closeMenu}>
              About
            </BootstrapNav.Link>
            <div className={styles.utilities}>
              {!loggedIn && (
                <div className={styles.loginSignupWrapper}>
                  <BootstrapNav.Link as={Link} to="/login">
                    Log in
                  </BootstrapNav.Link>
                  <BootstrapNav.Link className={styles.signupLink} as={Link} to="/signup">
                    <Button variant="transparent-light">Sign up</Button>
                  </BootstrapNav.Link>
                </div>
              )}
              {loggedIn && (
                <BootstrapNav.Link className={styles.createPostLink} as={Link} to="/create-post">
                  <Button className={styles.createPostButton} variant="light">Create</Button>
                </BootstrapNav.Link>
              )}
              {user && (
                <>
                  <BootstrapNav.Link
                    className={cx({[styles.currentPageLink]: pageTitle == 'Profile'})}
                    as={Link}
                    to="/profile"
                    onClick={closeMenu}
                  >
                    <span className={styles.icon}><img src={user.avatar.url}/></span>
                    {user.username}
                  </BootstrapNav.Link>
                  <div className={styles.logoutWrapper}>
                    <BootstrapNav.Link as={Link} to="/" onClick={handleLogOutClick}>
                      Log out
                    </BootstrapNav.Link>
                  </div>
                </>
              )}
            </div>
          </BootstrapNav>
        </Container>
      </BootstrapNavbar>
    )
  }

  const renderMobile = () => {
    return (
      <BootstrapNavbar
        className={cx(styles.nav, {isMobile})}
        fixed="top"
        expand="md"
        expanded={expanded}
        onToggle={(expanded) => setExpanded(expanded)}
      >
        <Container>
          <div className="d-flex align-items-center" ref={navbarRef}>
            <BootstrapNavbar.Brand className={styles.brand}>
              <Link to="/">
                <img className={styles.logo} src={logoPath} alt="Logo"/>
              </Link>
            </BootstrapNavbar.Brand>
            <span className={styles.pageTitle}>{pageTitle}</span>
          </div>
          <div className="d-flex align-items-center">
            {loggedIn && !isMobileNavOpen && (
              <BootstrapNav.Link className={styles.createPostLink} as={Link} to="/create-post">
                <Button className={styles.createPostButton} variant="light">Create</Button>
              </BootstrapNav.Link>
            )}
            <BootstrapNavbar.Toggle className={styles.toggle} as={CustomToggle} aria-controls="collapsable-nav">
              {isMobileNavOpen
                ? (<FontAwesomeIcon style={{fontSize: "1.5rem"}} icon={faTimes}/>)
                : (<FontAwesomeIcon icon={faBars}/>)}
            </BootstrapNavbar.Toggle>
          </div>
          <BootstrapNavbar.Collapse id="collapsable-nav" ref={collapsableNavRef}>
            <BootstrapNav
              className={cx("mr-auto", {isMobile})}
              style={isMobileNavOpen ? {height: `${windowHeight - navbarRef.current.clientHeight}px`} : {}}
              onSelect={() => setExpanded(false)}
            >
              <BootstrapNav.Link as={Link} to="/" onClick={closeMenu}>
                <span className={styles.icon}><FontAwesomeIcon icon={faHome}/></span>
                Home
              </BootstrapNav.Link>
              <BootstrapNav.Link as={Link} to="/about" onClick={closeMenu}>
                <span className={styles.icon}><FontAwesomeIcon icon={faInfo}/></span>
                About
              </BootstrapNav.Link>
              {user && (
                <BootstrapNav.Link as={Link} to="/profile" onClick={closeMenu}>
                  <span className={styles.icon}><img src={user.avatar.url}/></span>
                  {user.username}
                </BootstrapNav.Link>
              )}
              <div className={styles.utilities}>
                {!loggedIn && (
                  <div className={styles.loginSignupWrapper}>
                    <BootstrapNav.Link as={Link} to="/login">
                      Log in
                    </BootstrapNav.Link>
                    <BootstrapNav.Link className={styles.signupLink} as={Link} to="/signup">
                      <Button variant="transparent-light">Sign up</Button>
                    </BootstrapNav.Link>
                  </div>
                )}
                {loggedIn && (
                  <div className={styles.logoutWrapper}>
                    <BootstrapNav.Link as={Link} to="/" onClick={handleLogOutClick}>
                      Log out
                    </BootstrapNav.Link>
                  </div>
                )}
              </div>
            </BootstrapNav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    )
  }

  return isMobile
    ? renderMobile()
    : renderDesktop()
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
})

const actionCreators = {
  logOut,
}

export default connect(mapStateToProps, actionCreators)(Navbar)
