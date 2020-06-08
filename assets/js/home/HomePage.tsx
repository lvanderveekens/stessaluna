import React from "react"
import {Col, Container, Row} from "react-bootstrap"
import Feed from "../feed"
import Navbar from "../nav/Navbar"
import styles from "./HomePage.scss?module"
import {connect} from "react-redux";
import {State} from "../store";
import LoginSignupFooter from "./login-signup-footer/LoginSignupFooter"
import {COLUMN_BREAKPOINTS} from "../config/column-breakpoints";

interface Props {
  loggedIn: boolean
}

const HomePage = ({loggedIn}) => {
  return (
    <div className={styles.homePage}>
      <Navbar pageTitle="Home"/>
      <Container className={styles.content}>
        <Row className="justify-content-center">
          <Col {...COLUMN_BREAKPOINTS}>
            <Feed/>
          </Col>
        </Row>
      </Container>
      {!loggedIn && (<LoginSignupFooter/>)}
    </div>
  )
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.auth.loggedIn
})

export default connect(mapStateToProps)(HomePage)
