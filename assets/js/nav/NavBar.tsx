import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import React, { FC, useEffect, useState, useRef } from "react"
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

interface Props {
  page: string
  user?: User
  logOut: () => void
}

const Navbar: FC<Props> = ({ page, user, logOut }) => {
  const [expanded, setExpanded] = useState(false)
  const navRef = useRef(null)

  // if (!user) {
  //   return <Loader className={styles.loader} type="ball-clip-rotate-multiple" active />
  // }

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
    >
      <div className="d-flex align-items-center">
        <BootstrapNavbar.Brand className={styles.brand}>
          <Link to="/">
            <img className={styles.logo} src={logoPath} alt="Logo" />
            <MediaQuery query="(min-width: 768px)">
              <span>Stessaluna</span>
            </MediaQuery>
          </Link>
        </BootstrapNavbar.Brand>
        <span className={styles.page}>{page}</span>
      </div>
      <BootstrapNavbar.Toggle
        className={styles.toggle}
        as={CustomToggle}
        onClick={() => console.log("CLICKED")}
        aria-controls="responsive-navbar-nav"
      >
        <FontAwesomeIcon icon={faBars} />
      </BootstrapNavbar.Toggle>
      <BootstrapNavbar.Collapse id="responsive-navbar-nav">
        <BootstrapNav className="mr-auto">
          <BootstrapNav.Link as={Link} to="/">
            Home
          </BootstrapNav.Link>
          <BootstrapNav.Link as={Link} to="/profile">
            Profile
          </BootstrapNav.Link>
          <BootstrapNav.Link as={Link} to="/login" onClick={() => logOut()}>
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
