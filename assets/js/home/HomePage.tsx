import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Feed from "../feed"
import Navbar from "../nav/Navbar"
import styles from "./HomePage.scss?module"

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Navbar page="Home" />
      <Container className={styles.content}>
        <Row className="justify-content-center">
          <Col md={6} lg={6} xl={5}>
            <Feed />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage
