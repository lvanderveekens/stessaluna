import React from "react"
import {Col, Container, Row} from "react-bootstrap"
import Feed from "../feed"
import Navbar from "../nav/Navbar"
import styles from "./HomePage.scss?module"
import {connect} from "react-redux";
import {State} from "../store";
import LoginSignupFooter from "./login-signup-footer/LoginSignupFooter"

interface Props {
  loggedIn: boolean
}

const HomePage = ({loggedIn}) => {
  return (
    <div className={styles.homePage}>
      <Navbar page="Home"/>
      <Container className={styles.content}>
        <Row className="justify-content-center">
          <Col md={6} lg={6} xl={5}>
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
